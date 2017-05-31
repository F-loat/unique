var express = require('express');
var router = express.Router();
var Ware = require('../controllers/ware');
var Filter = require('../controllers/filter');

//数据
router.get('/',Ware.wares);

//页面
router.get('/orderDetail', Filter.turnBack,Ware.orderDetail);
router.get('/confirmOrder', Filter.turnBack,Ware.confirmOrder);

module.exports = router;
