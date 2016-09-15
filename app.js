var express = require('express');
var app = express();
var compression = require('compression');//gzip
var path = require('path');
var bodyParser  =  require('body-parser'); 
var session =  require('express-session');  
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var admin = require('./controllers/key/mongodb.json');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+admin.name+':'+admin.pwd+'@localhost/unique');

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'unique',
    resave:  false,
    saveUninitialized: true,
    name: 'unique',
    cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 },
    store: new mongoStore({
        url: 'mongodb://'+admin.name+':'+admin.pwd+'@localhost/unique',
        collection: 'sessions'
    })
}))

app.all('*', function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', '*');  
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');  
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();  
});

app.use('/request/user', require('./routes/user'));
app.use('/request/ware', require('./routes/ware'));

app.get('*', function (req, res){
  res.header('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

module.exports = app;
