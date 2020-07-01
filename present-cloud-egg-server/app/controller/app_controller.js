'use strict';

const Controller = require('egg').Controller;

class AppController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	
	// ------------------------登入------------------------

	// 登录方法
	async login() {
		const { ctx } = this;
		const loginMsg = ctx.request.body; // request.body获取前端post值
		const result = await ctx.service.login.login(loginMsg);
		ctx.body = result;
	}





	// 忘记密码
	async appResetPassword(){
		const { ctx } = this;
		const appPasswordMsg = ctx.request.body;
		const result = await ctx.service.login.appResetPassword(
			appPasswordMsg.phone,
			appPasswordMsg.newPwd,
		)
		ctx.body = result
	}


}

module.exports = AppController;