var mongoose = require('mongoose');
var User = require('../models/user');
var Order = require('../models/order');
var WechatAPI = require('wechat-api');
var wx = require('./key/wx.json');
var api = new WechatAPI(wx.appid, wx.appsecret);

exports.findAll = function (req, res) {
  Order
    .find()
    .populate({ path: 'address wares.info' })
    .sort({ _id: -1})
    .then(orders => {
      res.json({ state: 1, orders: orders })
    })
}

exports.findOne = function (req, res) {
  Order
    .findById(req.query._id)
    .populate({ path: 'address wares.info' })
    .then(order => {
      res.json({ state: 1, order: order })
    })
}

exports.assigned = function (req, res) {
  Order
    .findById(req.query._id)
    .then(order => {
      order.state = 1.1
      order.save()
      res.json({ state: 1 })
      return order.onwer
    })
    .then(onwer => {
      return User.findById(onwer)
    })
    .then(user => {
      api.sendText(user.openid, '您的订单已分配', (err, result) => {})
    })
}

exports.complete = function (req, res) {
  Order
    .findById(req.query._id)
    .then(order => {
      order.state = 2
      order.save()
      res.json({ state: 1 })
      return order.onwer
    })
    .then(onwer => {
      return User.findById(onwer)
    })
    .then(user => {
      api.sendText(user.openid, '您的订单已完成', (err, result) => {})
    })
}