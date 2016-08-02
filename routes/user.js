var express = require('express');
var router = express.Router();
var User = require('../controllers/user');
var Filter = require('../controllers/filter');

//数据
router.post('/regist', User.regist);
router.post('/regist/identify', User.identify);
router.post('/login', User.login);

//页面
router.get('/registPage', Filter.turnBack,User.registPage);
router.get('/loginPage', Filter.turnBack,User.loginPage);
router.get('/myOrders', Filter.turnBack,User.myOrders);
router.get('/myAddress', Filter.turnBack,User.myAddress);
router.get('/newAddress', Filter.turnBack,User.newAddress);
router.get('/myCoupons', Filter.turnBack,User.myCoupons);
router.get('/fedBack', Filter.turnBack,User.fedBack);

module.exports = router;
