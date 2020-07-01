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
		const result = await ctx.service.login.appLogin(loginMsg);
		ctx.body = result;
	}

	
	// 注册方法
	async register() {
		const { ctx } = this;
		const registerMsg = ctx.request.body;
		const result = await ctx.service.login.appRegister(registerMsg);
		ctx.body = result;
	}


	// ------------------------学生课程信息页面------------------------
	// // a)获取班课信息接口
	// async getCourseInfo() {
	// 	const { ctx } = this;
	// 	// get
	// 	const courseId  = ctx.query.courseId 
		
	// 	const result = await ctx.service.course.getCourseInfo(courseId);
	// 	ctx.body = result;
	// }


	// b)学生参与签到接口
	async signIn() {
		const { ctx } = this;
		const signMsg = ctx.request.body; // request.body获取前端post值
		const result = await ctx.service.signIn.signIn(signMsg);
		ctx.body = result;
	}


	

}

module.exports = AppController;