var express       = require('express');
var path          = require('path');
//var favicon = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var flash         = require('express-flash');
var session       = require('express-session');
var expressValidator = require('express-validator');
var mongoose      = require('mongoose');
var methodOverride = require('method-override');
var routes        = require('./routes/index');
var users = require('./routes/users');

var app           = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'rahasia12345', 
                 saveUninitialized: true,
                 resave: true}));
app.use(flash());
app.use(expressValidator());
app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body == 'object' && '_method' in req.body)
    {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use('/', routes);
app.use('/users', users);


var user          = require('./models/user');
mongoose.Promise  = global.Promise;
mongoose.connect('mongodb://localhost/luhut', { useMongoClient: true });

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;