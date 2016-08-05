var express = require('express');
var router = express.Router();
var Index = require('../controllers/index');
var Filter = require('../controllers/filter');

//页面
router.get('/', Index.index);

module.exports = router;
