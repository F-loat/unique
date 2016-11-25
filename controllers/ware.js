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
var wx = require('./key/wx.json')
var WechatAPI = require('wechat-api')
var api = new WechatAPI(wx.appid, wx.appsecret)

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
    var option = {
      order_no: order_no,
      app: { id: "app_8uP0qDHKm1C4P0Ki" },
      amount: (price + 0) * 100,
      client_ip: "123.206.9.219",
      currency: "cny",
      subject: "优力克蛋糕",
      body: "蛋糕",
      metadata: {
        'userId': req.session.userId,
        'openid': req.session.openid,
        'wares': wares,
        'receive': receivingTime,
        'address': addressId,
        'msg': msg,
        'fee': price + 0,
        'payway': payway
      }
    }
    if (payway === 1) {
      option.channel = 'alipay_wap',
      option.extra = {
        success_url: 'http://cakeees.top/person/orders',
        app_pay: true
      }
    } else {
      option.channel = 'wx_pub',
      option.extra = {
        open_id: req.session.openid
      }
    }
    pingpp.charges.create(option, (err, charge) => {
      if (err) {
        return console.log(err)
      }
      res.send(charge)
    })
  }
}
exports.buyAgain = function (req, res) {
  var time = new Date()
  time = time.getFullYear().toString() + (time.getMonth() + 1 > 9 ? '' : '0').toString() + (time.getMonth() + 1).toString() + (time.getDate() > 9 ? '' : '0').toString() + time.getDate().toString() + (time.getHours() > 9 ? '' : '0').toString() + time.getHours().toString() + (time.getMinutes() > 9 ? '' : '0').toString() + time.getMinutes().toString() + (time.getSeconds() > 9 ? '' : '0').toString() + time.getSeconds().toString() + time.getMilliseconds().toString()
  var order_no = time + req.session.userId.slice(9, 11)
  Order
    .findById(req.body.orderId)
    .exec((err, order) => {
      if (err) {
        return console.log(err)
      }
      console.log(order)
      var option = {
        order_no: order_no,
        app: { id: "app_8uP0qDHKm1C4P0Ki" },
        amount: order.fee * 100,
        client_ip: "123.206.9.219",
        currency: "cny",
        subject: "优力克蛋糕",
        body: "蛋糕",
        metadata: {
          'userId': req.session.userId,
          'openid': req.session.openid,
          'wares': order.wares,
          'receive': order.receivingTime,
          'address': order.addressId,
          'msg': order.msg,
          'fee': order.price,
          'payway': order.payway
        }
      }
      if (req.body.payway === '1') {
        option.channel = 'alipay_wap',
        option.extra = {
          success_url: 'http://cakeees.top/person/orders',
          app_pay: true
        }
      } else {
        option.channel = 'wx_pub',
        option.extra = {
          open_id: req.session.openid
        }
      }
      pingpp.charges.create(option, (err, charge) => {
        if (err) {
          return console.log(err)
        }
        res.send(charge)
      })
    })
}
exports.paySucceeded = function (req, res) {
  var app = req.body.data.object.app
  var order_no = req.body.data.object.order_no
  var metadata = req.body.data.object.metadata
  if (app == "app_8uP0qDHKm1C4P0Ki") {
    Order
      .create({
        order_no: order_no,
        onwer: metadata.userId,
        wares: metadata.wares,
        receive: metadata.receive,
        address: metadata.address,
        msg: metadata.msg,
        fee: metadata.fee,
        payway: metadata.payway,
        state: 1
      })
      .then((order) => {
        User
          .update({ _id: metadata.userId }, { $addToSet: { orders: order._id } })
          .exec()
        //删除购物车及用户信息中的相关订单
        for (let ware of metadata.wares) {
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
      })
      .catch(err => {
        console.log(err)
      })

    var templateId = 'CpqROodtbcvJyXyCPZ5ajZaNhFCxCC7MSmgWHbWxnaI'
    var backurl = 'http://cakeees.top'
    var topColor = '#FF0000'
    var data = {
      first: {
        "value": '交易信息：',
        "color": "#222222"
      },
      product: {
        "value": req.body.data.object.body,
        "color": "#222222"
      },
      price: {
        "value": req.body.data.object.amount * 0.01 + '元',
        "color": "#222222"
      },
      time: {
        "value": new Date(Date.now()).toLocaleString(),
        "color": "#222222"
      },
      remark: {
        "value": '',
        "color": "#222222"
      }
    }
    api.sendTemplate(req.body.data.object.metadata.openid, templateId, backurl, topColor, data, (err, result) => { res.sendStatus(200) })
    api.sendTemplate('oSOjqwaaxYH8HIsnEAGgKDd6A-Vk', templateId, backurl, topColor, data, (err, result) => {})
  } else {
    res.sendStatus(200)
  }
}