'use strict';

const Controller = require('egg').Controller;

class helloController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	// 登录方法
    async login() {
        const { ctx } = this;
        const loginMsg = ctx.request.body; // request.body获取前端post值
        const result = await ctx.service.login.login(loginMsg);
        ctx.body = result;
    }









}

module.exports = helloController;