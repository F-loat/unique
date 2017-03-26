var express = require('express');
var router = express.Router();
var Filter = require('../controllers/filter');
var Order = require('../controllers/order');

router.get('/', Filter.admin, Order.findAll);
router.get('/:id', Filter.admin, Order.findOne);
router.get('/assigned', Filter.admin, Order.assigned);
router.get('/complete', Filter.admin, Order.complete);

module.exports = router;
