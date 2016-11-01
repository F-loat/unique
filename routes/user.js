var express = require('express');
var router = express.Router();
var Filter = require('../controllers/filter');
var User = require('../controllers/user');

router.get('/', Filter.login, User.info);
router.get('/wxoauth',  User.wxoauth);
router.post('/regist', User.regist);
router.post('/regist/identify', User.identify);
router.post('/login', User.login);
router.post('/fastLogin/identify', User.identify);
router.post('/fastLogin', User.fastLogin);
router.get('/logout', User.logout);
router.post('/address/new', Filter.login, User.newAddress);
router.post('/address/default', Filter.login, User.defaultAddress);
router.post('/address/edit', Filter.login, User.editAddress);
router.post('/address/delete', Filter.login, User.deleteAddress);
router.post('/order/delete', Filter.login, User.deleteOrder);

module.exports = router;
