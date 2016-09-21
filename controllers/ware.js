var request = require('request')
var  crypto  =  require('crypto')
var fs = require('fs') 
var pingpp = require('pingpp')('sk_live_HWDOGC8GKWL0X1mTe9SCaDmL')
pingpp.setPrivateKeyPath("./controllers/key/rsa.pem")
var mongoose = require('mongoose')
var Ware = require('../models/ware')
var Order = require('../models/order')
var User = require('../models/user')
var Shopcar = require('../models/shopcar')

exports.wareInfo = function(req, res) {
  Ware.findOne({ _id: req.params.wareId },function(err, ware) {
    ware.img = 'http://cakeees.top/' + ware.img
    return res.send(ware)
  })
}
exports.waresInfo = function(req, res) {
  Ware.find(function(err, wares) {
    wares.map((ware) => {
      return ware.img = 'http://cakeees.top/' + ware.img
    })
    return res.send(wares)
  })
}
exports.addToShopcar = function(req, res) {
  var ware = JSON.parse(req.body.ware)
  var weight = ware.weight
  if (ware.dish) {
    var dish = ware.dish
    var img = ware.img
    Shopcar
      .findOne({ onwer: req.session.phone, dish: dish, weight: weight, img: img}, function(err, order) {
        if (order) {
          order.sum++
          order
            .save()
            .then(function() {
              Shopcar
                .find({ onwer: req.session.phone })
                .populate({ path: 'info' })
                .exec(function(err, orders) {
                    res.json({ "state": 1, "shopcar": orders })
                })
            })
        } else {
          Shopcar.create({ onwer: req.session.phone, dish: dish, weight: weight, img: img }, function(err, ware) {
            User.update({ phone: req.session.phone }, { $addToSet: { shopcar: ware._id } }, function(err) {
              Shopcar
                .find({ onwer: req.session.phone })
                .populate({ path: 'info' })
                .exec(function(err, orders) {
                    res.json({ "state": 1, "shopcar": orders })
                })
            })
          })
        }
      })
  } else {
    var wareId = ware.wareId
    Shopcar
      .findOne({ onwer: req.session.phone, info: wareId, weight: weight }, function(err, order) {
        if (order) {
          order.sum++
          order
            .save()
            .then(function() {
              Shopcar
                .find({ onwer: req.session.phone })
                .populate({ path: 'info' })
                .exec(function(err, orders) {
                    res.json({ "state": 1, "shopcar": orders })
                })
            })
        } else {
          Shopcar.create({ onwer: req.session.phone, info: wareId, weight: weight }, function(err, ware) {
            User.update({ phone: req.session.phone }, { $addToSet: { shopcar: ware._id } }, function(err) {
              Shopcar
                .find({ onwer: req.session.phone })
                .populate({ path: 'info' })
                .exec(function(err, orders) {
                  res.json({ "state": 1, "shopcar": orders })
                })
            })
          })
        }
      })
  }
}
exports.shopcarSumChange = function(req, res) {
  var _id = req.body.wareId
  var sum = req.body.sum
  if (sum == 0) {
    Shopcar.remove({ _id: _id }, function(err) {
      if (err) {
        res.json({ "state": 0, "err": err })
      }
      res.json({ "state": 1 })
    })
    User.update({ phone: req.session.phone }, { $pull: { shopcar: _id } }, function(err) {
      if (err) {
        console.log(err)
      }
    })
} else {
    Shopcar.update({ _id: _id }, { sum: sum }, function(err) {
      if (err) {
         res.json({ "state": 0, "err": err })
      } else {
         res.json({ "state": 1 })
      }
    })
  }
}
exports.pay = function(req, res) {
  var order = JSON.parse(req.body.order)
  var wares = order.wares
  var msg = order.msg
  var addressId = order.addressId
  var receivingTime = order.receivingTime
  var payway = order.payway
  var time = new Date()
  time = time.getFullYear().toString() + (time.getMonth() + 1 > 9 ? '' : '0').toString() + (time.getMonth() + 1).toString() + (time.getDate() > 9 ? '' : '0').toString() + time.getDate().toString() + (time.getHours() > 9 ? '' : '0').toString() + time.getHours().toString() + (time.getMinutes() > 9 ? '' : '0').toString() + time.getMinutes().toString() + (time.getSeconds() > 9 ? '' : '0').toString() + time.getSeconds().toString() + time.getMilliseconds().toString()
  var order_no = time + req.session.phone.slice(9, 11)
  var price = 0

  function getPrice(i) {
    return new Promise(function(resolve, reject) {
      var weight = wares[i].weight
      var sum = wares[i].sum
      Ware
        .findOne({ _id: wares[i].info._id })
        .exec(function(err, ware) {
            price += ware.price * weight * sum
            resolve(i)
        })
    })
  }
  for (var i = 0; i < wares.length; i++) {
    getPrice(i)
      .then(function(i) {
        if (i == wares.length - 1) {
          creat()
      }
    })
  }

  function creat() {
    pingpp.charges.create({
      order_no: order_no,
      app: { id: "app_8uP0qDHKm1C4P0Ki" },
      channel: payway == 1 ? 'alipay_wap' : 'wx_pub',
      amount: (price + 0) * 100,
      client_ip: "123.206.9.219",
      currency: "cny",
      subject: "优力克蛋糕",
      body: "蛋糕",
      extra: {
        success_url: 'http://cakeees.top/person/orders',
        app_pay: true
      }
    }, function(err, charge) {
      if (err) {
        return console.log(err)
      }
      res.send(charge)
    })
    Order
      .create({
        order_no: order_no,
        onwer: req.session.phone,
        wares: wares,
        receive: receivingTime,
        address: addressId,
        msg: msg,
        fee: price,
        payway: payway
      }, function(err, order) {
        User.update({ phone: req.session.phone }, { $addToSet: { orders: order._id } }, function(err) {
          if (err) {
            console.log(err)
          }
        })
      })
    for (var i = wares.length - 1; i >= 0; i--) {
      if(wares[i].shopcarId) {
        Shopcar.remove({_id:wares[i].shopcarId},function(err){
          if (err) {
            return console.log(err)
          }
        })
        User.update({phone:req.session.phone},{ $pull: { shopcar: wares[i].shopcarId } },function(err) {
          if (err) {
            return console.log(err)
          }
        })
      }
    }
  }
}
exports.payAgain = function(req, res) {
  var orderId = req.body.orderId
  Order.findOne({ _id: orderId }, function(err, order) {
    pingpp.charges.create({
      order_no: orderId,
      app: { id: "app_8uP0qDHKm1C4P0Ki" },
      channel: order.payway == 1 ? 'alipay_wap' : 'wx_pub',
      client_ip: "123.206.9.219",
      amount: order.fee * 100,
      currency: "cny",
      subject: "优力克蛋糕",
      body: "蛋糕",
      extra: {
        success_url: 'http://cakeees.top/person/orders',
        app_pay: true
      }
    }, function(err, charge) {
      if (err) {
        return console.log(err)
      }
      res.send(charge)
    })
  })
}
exports.paySucceeded = function(req, res) {
  var app = req.body.data.object.app
  var order_no = req.body.data.object.order_no
  if (app == "app_8uP0qDHKm1C4P0Ki") {
    Order.update({ order_no: order_no }, { $set: { state: 1 } }, function(err, order) {
        if (err) {
          return console.log(err)
        }
        res.sendStatus(200)
    })
  } else {
    res.sendStatus(200)
  }
}