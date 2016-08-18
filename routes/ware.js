var express = require('express');
var router = express.Router();
var Filter = require('../controllers/filter');
var Ware = require('../controllers/ware');

router.get('/', Ware.wares);
router.post('/shopcar/add', Filter.login, Ware.addToShopcar);
router.post('/shopcar/sum', Filter.login, Ware.shopcarSumChange);
router.post('/pay', Filter.login, Ware.pay);

module.exports = router;
