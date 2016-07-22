var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
var  cookieParser  =  require('cookie-parser'); 
var  bodyParser  =  require('body-parser'); 
var  session     =  require('express-session');  
var mongoose = require('mongoose');
var  RedisStore  =  require('connect-redis')(session);

mongoose.connect('mongodb://localhost/unique');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'unique',
    resave:  true,
    saveUninitialized: true,
    store:  new  RedisStore({     host:   "127.0.0.1",     port:  6379   })
}))

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/ware', require('./routes/ware'));

module.exports = app;
