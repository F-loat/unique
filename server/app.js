var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var admin = require('./controllers/key/mongodb.json');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+admin.name+':'+admin.pwd+'@123.206.9.219/unique');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'unique',
  resave:  false,
  saveUninitialized: true,
  name: 'unique',
  cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 },
  store: new mongoStore({
    url: 'mongodb://'+admin.name+':'+admin.pwd+'@123.206.9.219/unique',
    collection: 'sessions'
  })
}))

app.use('/request/user', require('./routes/user'));
app.use('/request/ware', require('./routes/ware'));
app.use('/request/order', require('./routes/order'));

module.exports = app;
