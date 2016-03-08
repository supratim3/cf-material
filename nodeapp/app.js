var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mustacheExpress = require('mustache-express');
var nunjucks = require('nunjucks');

var constants = require('./constants');
var config = require('./config');
var routes = require('./routes');

var app = express();

app.set("appconfig", config);
app.set("constants", constants);


// // Register '.mustache' extension with The Mustache Express
// app.engine('html', mustacheExpress());

// // view engine setup
// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'views'));

nunjucks.configure('./nodeapp/views', {
    autoescape: true,
    express: app
});


app.use(logger(config.env));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, '../public')));

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


