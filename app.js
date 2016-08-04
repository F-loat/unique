var express = require('express');
var app = express();
var compression = require('compression');
app.use(compression());
var path = require('path');
var ejs = require('ejs');
var bodyParser  =  require('body-parser'); 
var session =  require('express-session');  
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session)

mongoose.connect('mongodb://localhost/unique');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'unique',
    resave:  false,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    store: new mongoStore({
        url: 'mongodb://localhost/unique',
        collection: 'sessions'
    })
}))

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/ware', require('./routes/ware'));

module.exports = app;
