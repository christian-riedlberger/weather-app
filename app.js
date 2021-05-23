var createError = require('http-errors');
var express = require('express');
const bodyParser = require("body-parser");
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var testAPIRouter = require("./routes/testAPI");
var weatherRouter = require("./routes/weather");
var citiesRouter = require("./routes/cities");

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'react-client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Sets up routes for Express
app.use('/', indexRouter);
app.use("/testAPI", testAPIRouter);
app.use("/weather", weatherRouter);
app.use("/cities", citiesRouter);

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
