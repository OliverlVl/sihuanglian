/**
 * 快捷键：
 * 1.Ctrl+U: 返回上一光标位置
 * 2.Alt+上下: 上下移动代码
 * 3.Alt+Shift+F: 格式化代码(调整格式)
 * 4.Ctrl+Shift+P: 命令面板
 * 5.命令面板输入tra: 调整大小写
 * 6.Alt+鼠标点击: 多光标选择
 * 7.Ctrl+D: 选择距离最近单词
 * 8.Ctrl+g: 行跳转(选择行)
 * 9.F2:: 代码重构(全局改名)
 * 
 * 新建项目：
 * 1、打开空文件夹
 * 2、新建server.js（可选index.js）
 * 3、npm init建立 package.json
 * 插入：
 * 一、全局安装环境 npm install express -g
 * 二、测试是否成功 express -h
 * 三、脚手架的全局环境 npm install express-generator -g
 * 四、脚手架（项目目录结构）express -e （选Y）
 * 五、可建文件夹app,将routers等剪切进去
 * 六、node ./bin/www 运行(根据提示补充相应包模块npm install ** -save)
 * 4、npm install express -save 导入expres框架（-save 保存到dependence）
 * 5、npm install -g nodemon 安装可执行文件（-g 全局性安装）
 * 6、nodemon + 启动js名 启动程序
 * 
 * 
 */

//实验一: node server.js 执行 服务端输出
// console.log('ok')
// const msg = '你好'
// console.log(msg)

//实验二: 网页执行
// var express = require('express');
// var app = express();

// app.get('/', function(req, res) { //路由
//     //定义json格式()
//     var responseObject = [{name: 'lh' }, {name: 'LH'}]
//     // res.send('this is homepage!');
//     res.send(responseObject);
// });

// app.listen(3000);
// console.log('listening to port 3000'); 

//实验三 路由参数
var express = require('express');

var app = express();

app.get('/profile/:id', function (req, res) {  //冒号:加id为动态参数
    console.dir(req.params)
    res.send('You requested to see a profile with the id of ' + req.params.id);
});

app.get('/ab?cd', function (req, res) {
    res.send('/ab?cd'); //正则表达式 b出现0次或1次
})

app.get('/', function (req, res) {
    console.dir(req.query); //查询字符串
    res.send("home page: " + req.query.find); //find为网址url中定义
})


app.listen(3000);
console.log('listening to port 3000');
