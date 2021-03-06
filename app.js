var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var session = require('express-session');
var flash=require('connect-flash');

var web = require('./routes/web/index');
var admin = require('./routes/admin/admin');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// upload
// var multerObj = multer({dest:'./public/upload'});
// app.use(multerObj.any());
// cookie && session
app.use(cookieParser());
(function(){
  var keys = [];
  for(var i = 0; i< 10000; i++){
    keys[i] = "Secret_"+Math.random();
  }
  app.use(cookieSession({
    name: 'session_id',
    keys: keys,
    maxAge: 30*60*1000  //30min
  }));
})();
// flash
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', web);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
