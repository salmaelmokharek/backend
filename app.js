var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {handlerError} = require('./midleware/handler-err')
var cors = require('cors')



require('dotenv').config()

const authJwt = require ('./midleware/auth-jwt')

var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use(authJwt())

app.use(express.static(path.join(__dirname, 'public')));
 
const VERSION = process.env.VERSION
app.use(`${VERSION}/products`, productsRouter);
app.use(`${VERSION}/categories`, categoriesRouter);
app.use(`${VERSION}/users`, usersRouter);
app.use(`${VERSION}/orders`, ordersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(handlerError)

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json('error');
// });

module.exports = app;
