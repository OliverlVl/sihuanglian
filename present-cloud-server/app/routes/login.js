var express = require('express');
var router = express.Router();
var db = require('../libs/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
//   res.send('登录');
    res.render('login'); //路由跳转至ejs
});

router.post('/', function(req, res, next){
    // 获取参数 bady中元素name获取
    // var u = req.body;
    // console.log("post请求：参数: ", u);
    var username = req.body.username;
    var password = req.body.password;
    console.log("用户名:"+ username + " 密码:" + password );
    db.query("SELECT * FROM USER_TABLE WHERE USER_NAME = '"+username+"'",[],function(results,fields){
        console.log(results);
        if(results[0] != undefined){ //使用undefined字段
            // console.log("取值: " + results[0].user_password); //注意属性名格式
            if(results[0].user_password == password){
                // res.render('mian', { title: '登录成功' });
                res.send('登录成功');
            }else{
                res.send('密码错误');
            }
        }else{
            res.send('用户名不存在');
        }
    })
})

module.exports = router;
