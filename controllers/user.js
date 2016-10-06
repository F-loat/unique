var request = require('request'); //curl
var crypto  =  require('crypto') ; //加密
var mongoose = require('mongoose');
var User = require('../models/user');
var Shopcar = require('../models/shopcar');
var Address = require('../models/address');
var OAuth = require('wechat-oauth');
var client = new OAuth('wx3eb86a311c6b9da4', '38cfd0b73c0c082302320214ad96a2b7');
var url = client.getAuthorizeURL('http://cakeees.top', 'wxoauth', 'snsapi_userinfo');
console.log(url)

//数据
exports.wxoauth = function(req, res) {
  if (req.session.userId) {
    res.json({ "state": 1 })
  } else {
    client.getUserByCode(req.query.code, function (err, result) {
      if (err) {
        return res.send(err)
      } else if (result.openid) {
        User.findOne({ openid: result.openid }, function(err, user) {
          if (user) {
            req.session.userId = user._id;
            req.session.openid = user.openid;
            req.session.type = user.type;
            res.json({ "state": 1 })
          } else {
            User.create({ openid: result.openid, nickname: result.nickname, headimgurl: result.headimgurl }, function(err, user) {
              if (err) {
                return res.json({ "state": 0, "err": err })
              }
              req.session.userId = user._id;
              req.session.openid = user.openid;
              req.session.type = user.type;
              res.json({ "state": 1 })
            });
          }
        })
      } else {
        res.json({ "state": 0, "result": result })
      }
    })
  }
}
exports.info = function(req, res) {
  User
    .findOne({ _id: req.session.userId }, '-password -identify -identifyDate')
    .populate({
      path: 'addresses'
    })
    .populate({
      path: 'orders',
      select: 'address fee msg receive wares orderDate state',
      populate: { path: 'address wares.info' }
    })
    .populate({
      path: 'shopcar',
      select: 'info sum weight state dish img',
      populate: { path: 'info' }
    })
    .exec(function(err, user) {
      if (user) {
        res.send(user)
      } else {
        res.status(404)
      }
    })
}
exports.identify = function(req, res) {
  var phone = req.body.phone;
  var time = new Date();
  time = time.getFullYear().toString() + (time.getMonth() + 1 > 9 ? '' : '0').toString() + (time.getMonth() + 1).toString() + (time.getDate() > 9 ? '' : '0').toString() + time.getDate().toString() + (time.getHours() > 9 ? '' : '0').toString() + time.getHours().toString() + (time.getMinutes() > 9 ? '' : '0').toString() + time.getMinutes().toString() + (time.getSeconds() > 9 ? '' : '0').toString() + time.getSeconds().toString()
  var hasher = crypto.createHash("md5");
  hasher.update('78445ac96e8a4934841611662e5d2da6' + '61678420dc00404eadf070e3f898e219' + time);
  var code = parseInt(Math.random() * 1000000);
  request.post({
      url: 'https://api.miaodiyun.com/20150822/industrySMS/sendSMS',
      form: {
        accountSid: '78445ac96e8a4934841611662e5d2da6',
        smsContent: '【优力克】您的验证码是' + code + '，在30分钟内有效。如非本人操作请忽略本短信。',
        to: phone,
        timestamp: time,
        sig: hasher.digest('hex')
      },
      encoding: 'utf8'
    },
    function(error, response, body) {
      if (response.statusCode == 200) {
        body = JSON.parse(body);
        if (body.respCode === "00000") {
          User.findOne({ phone: phone }, function(err, user) {
            if (user) {
              User.update({ phone: phone }, { $set: { identify: code, identifyDate: Date.now() } }, function(err) {
                if (err) {
                  return res.json({ "state": 0, "err": err })
                }
                res.json({ "state": 1 })
              })
            } else {
              User.create({ phone: phone, nickname: phone, identify: code }, function(err) {
                if (err) {
                  return res.json({ "state": 0, "err": err })
                }
                res.json({ "state": 1 })
              });
            }
          })
        } else {
          res.json({ "state": 0, "errCode": body.respCode })
          console.log(body)
        }
      } else {
        console.log(response.statusCode);
      }
    }
  );
}
exports.fastLogin = function(req, res) {
  var phone = req.body.phone,
    identify = req.body.identify;
  User.findOne({ phone: phone }, function(err, user) {
    if (user) {
      if ((Date.now() - user.identifyDate) > 30 * 60 * 1000) {
        res.json({ "state": 0, "err": "验证码超时,请重新获取" });
      } else {
        if (identify == user.identify) {
          req.session.userId = user._id;
          req.session.type = user.type;
          res.json({ "state": 1 })
        } else {
          res.json({ "state": 0, "err": "验证码输入错误" })
        }
      }
    } else {
      res.json({ "state": 0, "err": "请先获取验证码" })
    }
  })
}
exports.regist = function(req, res) {
  var phone = req.body.phone,
    password = req.body.password,
    identify = req.body.identify;
  var hasher = crypto.createHash("md5");
  hasher.update(password);
  password = hasher.digest('hex');
  User.findOne({ phone: phone }, function(err, user) {
    if (user.password) {
      res.json({ "state": 0, "err": "该手机号已注册，请直接登录" })
    } else {
      if ((Date.now() - user.identifyDate) > 30 * 60 * 1000) {
        res.json({ "state": 0, "err": "验证码超时,请重新获取" });
      } else {
        if (identify == user.identify) {
          User.update({ phone: phone }, { $set: { password: password, type: 1, regDate: Date.now() } }, function(err) {
            if (err) {
              return res.json({ "state": 0, "err": err })
            }
            req.session.userId = user._id;
            req.session.type = user.type;
            res.json({ "state": 1 })
          })
        } else {
          res.json({ "state": 0, "err": "验证码输入错误" })
        }
      }
    }
  })
}
exports.login = function(req, res) {
  var phone = req.body.phone;
  var password = req.body.password;
  var hasher = crypto.createHash("md5");
  hasher.update(password);
  password = hasher.digest('hex');
  User.findOne({ phone: phone }, function(err, user) {
    if (user) {
      if (user.password) {
        if (password == user.password) {
          req.session.userId = user._id;
          req.session.type = user.type;
          res.json({ "state": 1 })
        } else {
          res.json({ "state": 0, "err": "密码输入错误" })
        }
      } else {
        res.json({ "state": 0, "err": "请使用快速登录或前往注册" })
      }
    } else {
      res.json({ "state": 0, "err": "该手机号尚未注册，请注册后登录" })
    }
  })
}
exports.logout = function(req, res) {
  req.session.destroy();
  res.json({ "state": 1 })
}
exports.newAddress = function(req, res) {
  var addressInfo = JSON.parse(req.body.addressInfo);
  Address.create({
    onwer: req.session.userId,
    phone: addressInfo.phone,
    receiver: addressInfo.receiver,
    site: addressInfo.site,
    state: addressInfo.state
  }, function(err, address) {
    User.update({ _id: req.session.userId }, { $addToSet: { addresses: address._id } }, function(err) {
      if (err) {
        return res.json({ "state": 0, "err": err })
      }
      res.json({ "state": 1 ,"address": address})
    })
  })
}
exports.defaultAddress = function(req, res) {
  var addressId = req.body.addressId;
  Address
    .find({ onwer: req.session.userId })
    .exec(function(err, addresses) {
      for (var i = addresses.length - 1; i >= 0; i--) {
        addresses[i].state = 0
        addresses[i].save()
      }
    })
    .then(function() {
      Address
        .update({ _id: addressId }, { $set: { state: 1 } })
        .exec(function(err) {
          res.json({ "state": 1 })
        })
    })
}
exports.editAddress = function(req, res) {

}
exports.deleteAddress = function(req, res) {
  var addressId = req.body.addressId;
  Address
    .remove({ _id: addressId })
    .exec(function(err) {
      res.json({ "state": 1 })
    })
  User
    .update({ _id: req.session.userId }, { $pull: { addresses: addressId } })
    .exec()
}
