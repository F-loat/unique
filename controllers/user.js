var request = require('request'); //curl
var crypto  =  require('crypto') ; //加密
var mongoose = require('mongoose');
var User = require('../models/user');
var Shopcar = require('../models/shopcar');
var Address = require('../models/address');
var Order = require('../models/order');
var OAuth = require('wechat-oauth');
var wx = require('./key/wx.json');
var client = new OAuth(wx.appid, wx.appsecret);

//数据
exports.wxoauth = function (req, res) {
  if (req.query.code === "undefined") {
    return res.json({"turnUrl" : client.getAuthorizeURL(req.headers.referer, 'wxoauth', 'snsapi_userinfo'), "state" : 0})
  }
  if (req.session.openid) return res.json({ "state": 1 })
  client.getUserByCode(req.query.code, (err, result) => {
    if (err) {
      return res.json({"turnUrl" : client.getAuthorizeURL(req.headers.referer, 'wxoauth', 'snsapi_userinfo'), "state" : 0, "err" : err})
    }
    if (!result.openid) return res.json({ "state": 0, "result": result })
    User
      .findOne({ openid: result.openid })
      .then(user => {
        if (user) return user
        return User
          .create({
            openid: result.openid,
            nickname: result.nickname,
            headimgurl: result.headimgurl,
            regDate: Date.now()
          })
      })
      .then(user => {
        req.session.userId = user._id
        req.session.openid = user.openid
        req.session.type = user.type
        res.json({ "state": 1 })
      })
      .catch(err => {
        res.json({ "state": 0, "err": err })
      })
  })
}

exports.info = function (req, res) {
  User
    .findById(req.session.userId, '-password -identify -identifyDate')
    .populate({
      path: 'addresses'
    })
    .populate({
      path: 'orders',
      select: 'order_no address fee msg receive wares orderDate state',
      populate: { path: 'address wares.info' }
    })
    .populate({
      path: 'shopcar',
      select: 'info sum weight state dish img',
      populate: { path: 'info' }
    })
    .then(user => {
      res.json({ state: 1, user: user })
    })
    .catch(err => {
      res.json({ state: 0, err: err })
    })
}

exports.identify = function (req, res) {
  var phone = req.body.phone
  var time = new Date()
  time = time.getFullYear().toString() + (time.getMonth() + 1 > 9 ? '' : '0').toString() + (time.getMonth() + 1).toString() + (time.getDate() > 9 ? '' : '0').toString() + time.getDate().toString() + (time.getHours() > 9 ? '' : '0').toString() + time.getHours().toString() + (time.getMinutes() > 9 ? '' : '0').toString() + time.getMinutes().toString() + (time.getSeconds() > 9 ? '' : '0').toString() + time.getSeconds().toString()
  var hasher = crypto.createHash("md5")
  hasher.update('78445ac96e8a4934841611662e5d2da6' + '61678420dc00404eadf070e3f898e219' + time)
  var code = parseInt(Math.random() * 1000000)
  request.post(
    {
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
    function (error, response, body) {
      if (response.statusCode == 200) {
        body = JSON.parse(body)
        if (body.respCode === "00000") {
          User
            .findOne({ phone: phone })
            .exec((err, user) => {
              if (user) {
                User
                  .update({
                    phone: phone
                  }, {
                    $set: { identify: code, identifyDate: Date.now() }
                  })
                  .exec((err) => {
                    if (err) {
                      return res.json({ "state": 0, "err": err })
                    }
                    res.json({ "state": 1 })
                  })
              } else {
                User
                  .create({
                    phone: phone,
                    nickname: phone,
                    identify: code,
                    identifyDate: Date.now()
                  })
                  .then(() => {
                    res.json({ "state": 1 })
                  })
                  .catch((err) => {
                    res.json({ "state": 0, "err": err })
                  })
              }
            })
        } else if (body.respCode === "00104") {
          res.json({ "state": 0, "err": "该手机号当天接受短信次数已达上限" })
        } else {
          res.json({ "state": 0, "errCode": body.respCode })
        }
      }
    }
  )
}

exports.fastLogin = function(req, res) {
  var phone = req.body.phone
  var identify = req.body.identify
  User
    .findOne({ phone: phone })
    .then(user => {
      if (!user) return res.json({ "state": 0, "err": "请先获取验证码" })
      if ((Date.now() - user.identifyDate) > 30 * 60 * 1000) {
        return res.json({ "state": 0, "err": "验证码超时,请重新获取" });
      }
      if (identify != user.identify) return res.json({ "state": 0, "err": "验证码输入错误" })
      req.session.userId = user._id;
      req.session.type = user.type;
      res.json({ "state": 1 });
  })
  .catch(err => {
    res.json({ state: 0, err: err })
  })
}

exports.regist = function (req, res) {
  var phone = req.body.phone
  var password = req.body.password
  var identify = req.body.identify
  var hasher = crypto.createHash("md5")
  hasher.update(password)
  password = hasher.digest('hex')
  User
    .findOne({ phone: phone })
    .exec((err, user) => {
      if (user.password) {
        res.json({ "state": 0, "err": "该手机号已注册，请直接登录" })
      } else {
        if ((Date.now() - user.identifyDate) > 30 * 60 * 1000) {
          res.json({ "state": 0, "err": "验证码超时,请重新获取" });
        } else {
          if (identify == user.identify) {
            User
              .update({
                phone: phone
              }, {
                $set: {
                  password: password,
                  type: 1,
                  regDate: Date.now()
                }
              })
              .exec((err) => {
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

exports.login = function (req, res) {
  var phone = req.body.phone
  var password = req.body.password
  var hasher = crypto.createHash("md5")
  hasher.update(password)
  password = hasher.digest('hex')
  User
    .findOne({ phone: phone })
    .then(user => {
      if (!user) return res.json({ "state": 0, "err": "该手机号尚未注册，请注册后登录" })
      if (!user.password) return res.json({ "state": 0, "err": "密码输入错误" })
      if (password != user.password) return res.json({ "state": 0, "err": "请使用快速登录或前往注册" })
      req.session.userId = user._id;
      req.session.type = user.type;
      return res.json({ "state": 1 });
    })
    .catch(err => {
      res.json({ state: 0, err: err })
    })
}

exports.logout = function (req, res) {
  req.session.destroy();
  res.json({ "state": 1 })
}

exports.newAddress = function (req, res) {
  var addressInfo = JSON.parse(req.body.addressInfo)
  Address
    .create({
      onwer: req.session.userId,
      phone: addressInfo.phone,
      receiver: addressInfo.receiver,
      site: addressInfo.site,
      state: addressInfo.state
    })
    .then(address => {
      User
        .update({
          _id: req.session.userId
        }, {
          $addToSet: { addresses: address._id }
        })
        .exec()
      return address
    })
    .then(address => {
      res.json({ "state": 1 ,"address": address})
    })
    .catch(err => {
      res.json({ state: 0, err: err })
    })
}

exports.defaultAddress = function (req, res) {
  var addressId = req.body.addressId
  Address
    .find({ onwer: req.session.userId })
    .then(addresses => {
      for (let address of addresses) {
        address.state = 0
      }
      addresses.save()
      return Address
        .update({
            _id: addressId
          }, {
            $set: { state: 1 }
          })
    })
    .exec((err) => {
      res.json({ "state": 1 })
    })
    .catch(err => {
      res.json({ state: 0, err: err })
    })
}

exports.deleteAddress = function (req, res) {
  var addressId = req.body.addressId;
  Address
    .remove({ _id: addressId })
    .exec()
  User
    .update({
      _id: req.session.userId 
    }, {
      $pull: { addresses: addressId } 
    })
    .exec((err) => {
      res.json({ "state": 1 })
    })
}

exports.applyRefund = function (req, res) {
  var orderId = req.body.orderId
  Order
    .update({ _id: orderId }, { state: -1, refundmsg: req.body.refundmsg })
    .exec(err => {
      if (err) return res.json({ state: 0, err: err })
      res.json({ state: 1 })
    })
}
