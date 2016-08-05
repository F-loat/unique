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

module.exports = router;
