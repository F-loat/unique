var express = require('express');
var router = express.Router();
var User = require('../controllers/user');
var Filter = require('../controllers/filter');

//数据
router.get('/', Filter.turnBack,User.info);
router.post('/regist', User.regist);
router.post('/regist/identify', User.identify);
router.post('/login', User.login);
router.post('/fastLogin/identify', User.identify);
router.post('/fastLogin', User.fastLogin);
router.get('/logout', User.logout);

//页面
router.get('/registPage', Filter.turnBack,User.registPage);
router.get('/loginPage', Filter.turnBack,User.loginPage);
router.get('/fastLoginPage', Filter.turnBack,User.fastLoginPage);
router.get('/myOrders', Filter.turnBack,User.myOrders);
router.get('/myAddress', Filter.turnBack,User.myAddress);
router.get('/newAddress', Filter.turnBack,User.newAddress);
router.get('/myCoupons', Filter.turnBack,User.myCoupons);
router.get('/fedBack', Filter.turnBack,User.fedBack);

module.exports = router;
