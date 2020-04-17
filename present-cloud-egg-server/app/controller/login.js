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

        console.log("LoginController: " + JSON.stringify(user))
        const result = await ctx.service.login.login(user)
        console.log(result)
        ctx.body = result // 返回给前端
    }

}

module.exports = LoginController;
