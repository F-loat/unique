var mongoose = require('mongoose');
var Ware = require('../modules/ware');

//数据
exports.wares = function(req, res) {
    Ware.find(function(err, wares) {
        return res.send(wares)
    })
}

//页面
exports.orderDetail = function(req, res) {
    res.render('orderDetail');
}
exports.confirmOrder = function(req, res) {
    res.render('confirmOrder');
}

