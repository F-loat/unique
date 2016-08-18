var express = require('express');
var app = express();
var compression = require('compression');//gzip
var path = require('path');
var bodyParser  =  require('body-parser'); 
var session =  require('express-session');  
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/unique');

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'unique',
    resave:  false,
    saveUninitialized: true,
    name: 'unique',
    cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 },
    store: new mongoStore({
        url: 'mongodb://localhost/unique',
        collection: 'sessions'
    })
}))

app.use('/user', require('./routes/user'));
app.use('/ware', require('./routes/ware'));

module.exports = app;
