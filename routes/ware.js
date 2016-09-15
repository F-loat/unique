var express = require('express');
var router = express.Router();
var Filter = require('../controllers/filter');
var Ware = require('../controllers/ware');

router.get('/:wareId', Ware.wareInfo);
router.get('/', Ware.waresInfo);
router.post('/shopcar/add', Filter.login, Ware.addToShopcar);
router.post('/shopcar/sum', Filter.login, Ware.shopcarSumChange);
router.post('/pay', Filter.login, Ware.pay);
router.post('/pay/again', Filter.login, Ware.payAgain);
router.post('/pay/succeeded', Ware.paySucceeded);

module.exports = router;
