var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let session = require('express-session');
let mongodb=require('./config/dbConfig');
var qiniu =require('./routes/qiniu');
var category=require('./controller/Category')

let cors=require('cors');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


app.use(cors({
  //允许跨域的域名
  origin:"http://localhost:8080",
  credentials:true,
}))


app.use(session({
  secret: 'chen',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  // expires: 3600*1000*30,
  // store: new MongoStore({
  //     url: 'mongodb://localhost/mydidi-project',
  //     ttl: 60*60*24*30
  // })
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', qiniu);
app.use('/users', users);


app.use("/api",require("./controller/index"));

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
