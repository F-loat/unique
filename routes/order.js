var express = require('express');
var router = express.Router();
var Filter = require('../controllers/filter');
var Order = require('../controllers/order');

router.get('/', Filter.admin, Order.findAll);

module.exports = router;
