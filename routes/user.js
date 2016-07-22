var express = require('express');
var router = express.Router();

router.get('/signin', function(req, res, next) {
    res.render('signin');
});

router.get('/myOrders', function(req, res, next) {
    if (req.xhr) {
        res.render('myOrders');
    } else {
        res.redirect('/');
    }
}); 

router.get('/myAddress', function(req, res, next) {
    if (req.xhr) {
        res.render('myAddress');
    } else {
        res.redirect('/');
    }
});

router.get('/newAddress', function(req, res, next) {
    if (req.xhr) {
        res.render('newAddress');
    } else {
        res.redirect('/');
    }
});

router.get('/myCoupons', function(req, res, next) {
    if (req.xhr) {
        res.render('myCoupons');
    } else {
        res.redirect('/');
    }
});

router.get('/fedBack', function(req, res, next) {
    if (req.xhr) {
        res.render('fedBack');
    } else {
        res.redirect('/');
    }
});

module.exports = router;
