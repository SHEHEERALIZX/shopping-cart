require('dotenv').config()

var session = require('express-session')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');
var fileupload = require("express-fileupload");
const mongoose = require('mongoose');
mongoose.connect(process.env.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true

})


var indexRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname + '/views/layout/',partialsDir:__dirname + '/views/partials/'}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret:"hello_world",
  resave: true,
  saveUninitialized: true,
  cookie:{maxAge:6000000}
}))
app.use(cookieParser());

process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());

app.use('/', usersRouter);
app.use('/admin', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
