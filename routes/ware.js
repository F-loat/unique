var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/cake', function(req, res, next) {
    res.send(JSON.parse(fs.readFileSync('./tmp/cake.json')));
});
router.get('/mousse', function(req, res, next) {
    res.send(JSON.parse(fs.readFileSync('./tmp/mousse.json')));
});
router.get('/flower', function(req, res, next) {
    res.send(JSON.parse(fs.readFileSync('./tmp/flower.json')));
});

module.exports = router;
