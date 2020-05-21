'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg'; // 返回给前端
    }

    // 登录方法
    async login() {
        const { ctx } = this;
        const user = ctx.request.body; // request.body获取前端post值

        console.log("LoginController: " + JSON.stringify(user));
        const result = await ctx.service.login.login(user);
        console.log(result);
        if (result != false) {
            //token
            const token = this.app.jwt.sign({
                login_name: user.login_name,
            }, this.app.config.jwt.secret);
            // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
            // 特别注意：token不能直接发送，要在前面加上Bearer字符串和一个空格
            ctx.body = { ...result, token } // 返回给前端
        } else {
            ctx.body = {
                "code": "404",
                "msg": "用戶不存在"
            }
        }

    }

    // 注册方法
    async register() {
        const { ctx } = this;
        const user = ctx.request.body;
        console.log(user.login_password)
        user.login_password = await ctx.service.login.getMd5Data(user.login_password)
        console.log(user.login_password)
        const result = await ctx.service.login.register(user);
        console.log("注册结果", result);
        ctx.body = result;

    }

    // MD5加密方法
    async getMd5Data() {
        const { ctx } = this;
        // 斜杠传值
        ctx.body = await ctx.service.login.getMd5Data(ctx.params.data);
    }


    //修改密码
    async updatePassword() {
        const { ctx } = this;
        const password = ctx.request.body.password;
        //md5加密
        const md5Password = await ctx.service.login.getMd5Data(password);
        //查找密码
        const user = ctx.request.body;
        const user1 = await ctx.service.login.selectPassword(user);
        //修改
        if (user1 == false) {
            ctx.body = { status: "用户不存在" }; //用户不存在
        } else if (md5Password != user1.login_password) {
            ctx.body = { status: "密码错误" }; //密码错误
        } else {
            const result = await ctx.service.login.updatePassword(md5Password, user)
            ctx.body = { status: "修改成功" };
        }

    }

}

module.exports = LoginController;
