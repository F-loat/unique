var express = require('express');
var router = express.Router();
var Ware = require('../controllers/ware');
var Filter = require('../controllers/filter');

//数据
router.get('/',Ware.wares);

module.exports = router;
