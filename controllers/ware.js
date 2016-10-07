var request = require('request')
var crypto  =  require('crypto')
var fs = require('fs') 
var pingpp = require('pingpp')('sk_live_HWDOGC8GKWL0X1mTe9SCaDmL')
pingpp.setPrivateKeyPath("./controllers/key/rsa.pem")
var mongoose = require('mongoose')
var Ware = require('../models/ware')
var Order = require('../models/order')
var User = require('../models/user')
var Shopcar = require('../models/shopcar')

exports.wareInfo = function (req, res) {
  Ware
    .findById(req.params.wareId)
    .exec((err, ware) => {
      res.send(ware)
    })
}
exports.waresInfo = function (req, res) {
  Ware
    .find()
    .exec((err, wares) => {
      res.send(wares)
    })
}
exports.addToShopcar = function (req, res) {
  var ware = JSON.parse(req.body.ware)
  var weight = ware.weight
  var wareId = ware.wareId
  Shopcar
    .findOne({ onwer: req.session.userId, info: wareId, weight: weight })
    .exec((err, order) => {
      if (order) {
        order.sum++
        order.save()
        Shopcar
          .find({ onwer: req.session.userId })
          .populate({ path: 'info' })
          .exec((err, orders) => {
            res.json({ "state": 1, "shopcar": orders })
          })
      } else {
        Shopcar
          .create({ onwer: req.session.userId, info: wareId, weight: weight })
          .then(ware => {
            User
              .update({ _id: req.session.userId }, { $addToSet: { shopcar: ware._id } })
              .exec()
            Shopcar
              .find({ onwer: req.session.userId })
              .populate({ path: 'info' })
              .exec((err, orders) => {
                res.json({ "state": 1, "shopcar": orders })
              })
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
}
exports.shopcarSumChange = function (req, res) {
  var _id = req.body.wareId
  var sum = req.body.sum
  if (sum == 0) {
    Shopcar
      .remove({ _id: _id })
      .exec((err) => {
        if (err) {
          res.json({ "state": 0, "err": err })
        } else {
          res.json({ "state": 1 })
        }
      })
    User
      .update({ _id: req.session.userId }, { $pull: { shopcar: _id } })
      .exec()
  } else {
    Shopcar
      .update({ _id: _id }, { sum: sum })
      .exec((err) => {
        if (err) {
           res.json({ "state": 0, "err": err })
        } else {
           res.json({ "state": 1 })
        }
      })
  }
}
exports.pay = function (req, res) {
  var order = JSON.parse(req.body.order)
  var wares = order.wares
  var msg = order.msg
  var addressId = order.addressId
  var receivingTime = order.receivingTime
  var payway = order.payway
  var time = new Date()
  time = time.getFullYear().toString() + (time.getMonth() + 1 > 9 ? '' : '0').toString() + (time.getMonth() + 1).toString() + (time.getDate() > 9 ? '' : '0').toString() + time.getDate().toString() + (time.getHours() > 9 ? '' : '0').toString() + time.getHours().toString() + (time.getMinutes() > 9 ? '' : '0').toString() + time.getMinutes().toString() + (time.getSeconds() > 9 ? '' : '0').toString() + time.getSeconds().toString() + time.getMilliseconds().toString()
  var order_no = time + req.session.userId.slice(9, 11)
  var price = 0

  function getPrice (i) {
    return new Promise((resolve, reject) => {
      var weight = wares[i].weight
      var sum = wares[i].sum
      Ware
        .findById(wares[i].info._id)
        .exec((err, ware) => {
          price += ware.price * weight * sum
          resolve(i)
        })
    })
  }
  for (var i = 0; i < wares.length; i++) {
    getPrice(i)
      .then((i) => {
        if (i == wares.length - 1) { creat() }
    })
  }

  function creat () {
    if (payway === 1) {
      pingpp.charges.create({
        order_no: order_no,
        app: { id: "app_8uP0qDHKm1C4P0Ki" },
        channel: 'alipay_wap',
        amount: (price + 0) * 100,
        client_ip: "123.206.9.219",
        currency: "cny",
        subject: "优力克蛋糕",
        body: "蛋糕",
        extra: {
          success_url: 'http://cakeees.top/person/orders',
          app_pay: true
        }
      }, (err, charge) => {
        if (err) {
          return console.log(err)
        }
        res.send(charge)
      })
    } else {
      pingpp.charges.create({
        order_no: order_no,
        app: { id: "app_8uP0qDHKm1C4P0Ki" },
        channel: 'wx_pub',
        amount: (price + 0) * 100,
        client_ip: "123.206.9.219",
        currency: "cny",
        subject: "优力克蛋糕",
        body: "蛋糕",
        extra: {
          open_id: req.session.openid
        }
      }, (err, charge) => {
        if (err) {
          return console.log(err)
        }
        res.send(charge)
      })
    }

    Order
      .create({
        order_no: order_no,
        onwer: req.session.userId,
        wares: wares,
        receive: receivingTime,
        address: addressId,
        msg: msg,
        fee: price,
        payway: payway
      })
      .then((order) => {
        User
          .update({ _id: req.session.userId }, { $addToSet: { orders: order._id } })
          .exec((err) => {
            if (err) { console.log(err) }
          })
      })
      .catch(err => {
        console.log(err)
      })

    //删除购物车及用户信息中的相关订单
    for (let ware of wares) {
      if(ware._id) {
        Shopcar
          .remove({_id:ware._id})
          .exec((err) => {
            if (err) { console.log(err) }
          })
        User
          .update({_id:req.session.userId},{ $pull: { shopcar: ware._id } })
          .exec((err) => {
            if (err) { console.log(err) }
          })
      }
    }
  }
}
exports.payAgain = function (req, res) {
  var orderId = req.body.orderId
  Order
    .findById(orderId)
    .exec((err, order) => {
      if (err) {
        return console.log(err)
      }
      if (req.body.payway === '1') {
        pingpp.charges.create({
          order_no: orderId,
          app: { id: "app_8uP0qDHKm1C4P0Ki" },
          channel: 'alipay_wap',
          amount: order.fee * 100,
          client_ip: "123.206.9.219",
          currency: "cny",
          subject: "优力克蛋糕",
          body: "蛋糕",
          extra: {
            success_url: 'http://cakeees.top/person/orders',
            app_pay: true
          }
        }, (err, charge) => {
          if (err) {
            return console.log(err)
          }
          res.send(charge)
        })
      } else {
        pingpp.charges.create({
          order_no: orderId,
          app: { id: "app_8uP0qDHKm1C4P0Ki" },
          channel: 'wx_pub',
          amount: order.fee * 100,
          client_ip: "123.206.9.219",
          currency: "cny",
          subject: "优力克蛋糕",
          body: "蛋糕",
          extra: {
            open_id: req.session.openid
          }
        }, (err, charge) => {
          if (err) {
            return console.log(err)
          }
          res.send(charge)
        })
      }
    })
}
exports.paySucceeded = function (req, res) {
  var app = req.body.data.object.app
  var order_no = req.body.data.object.order_no
  if (app == "app_8uP0qDHKm1C4P0Ki") {
    Order
      .update({ order_no: order_no }, { $set: { state: 1 } })
      .exec((err) => {
        if (err) { return console.log(err) }
        res.sendStatus(200)
      })
  } else {
    res.sendStatus(200)
  }
}