var express = require('express');
var router = express.Router();
var Index = require('../controllers/index');
var Filter = require('../controllers/filter');

//页面
router.get('/', Index.index);
router.get('/customTailor', Filter.turnBack,Index.customTailor);
router.get('/aboutUs', Filter.turnBack,Index.aboutUs);
router.get('/userAgreement', Filter.turnBack,Index.userAgreement);

module.exports = router;
