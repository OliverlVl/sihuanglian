var express = require('express');
var router = express.Router();
var db = require("../libs/db"); //引入数据库封装模块

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
/* GET home page. */
router.get('/', function(req, res, next) {

  //查询users表
  db.query("SELECT * FROM USER_TABLE",[],function(results,fields){
    console.log(results);
    
    res.render('index', { title: 'Express' });
  })
  
});

module.exports = router;