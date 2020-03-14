var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/users');
//配置路由
var loginRouter = require('./app/routes/login'); //载入自定义模块

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//增加路由配置（对应views中请求）
app.use('/login', loginRouter);

//接受post表单数据

// 解析,用req.body获取post参数
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

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

//mysql 连接 测试
//Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not supntication protocol requested by server; consider upgradilient
//mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Admin888'
//---------测试代码----------
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'Admin888',
//   database : 'daoyun'
// });
 
// connection.connect();
 
// connection.query('SELECT * from user_table', function(err, data, fields) {
//   if (err) {
//     console.log(err);
//     return;
//   };
 
//   // console.log(data);
//   //调整数据格式
//   console.log(JSON.parse(JSON.stringify(data)));
// });
 
// connection.end();