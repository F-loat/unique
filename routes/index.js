var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/customTailor', function(req, res, next) {
    if (req.xhr) {
        res.render('customTailor');
    } else {
        res.redirect('/');
    }
});

router.get('/aboutUs', function(req, res, next) {
    if (req.xhr) {
        res.render('aboutUs');
    } else {
        res.redirect('/');
    }
});

router.get('/userAgreement', function(req, res, next) {
    if (req.xhr) {
        res.render('userAgreement');
    } else {
        res.redirect('/');
    }
});
module.exports = router;
