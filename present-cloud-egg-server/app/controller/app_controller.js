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
	async appResetPassword() {
		const { ctx } = this;
		const appPasswordMsg = ctx.request.body;
		const result = await ctx.service.login.appResetPassword(
			appPasswordMsg.phone,
			appPasswordMsg.newPwd,
		)
		ctx.body = result
	}


	// ------------------------学生主页页面------------------------

	// 获取课程表
	async selcetCourseList() {
		const { ctx } = this;
		const token = JSON.parse(ctx.request.header.token);
		//根据学生id获取课程信息
		const selectCourse = await ctx.service.selectCourse.selectSeclectCourseByStudentId(token.id)

		console.log(selectCourse.length)
		//根据课程id获取课程信息
		var result = []
		for (var i = 0; i < selectCourse.length; i++) {
			const course = await ctx.service.course.selcetCourseInfoByCourseId(selectCourse[i].course_id)
			result.push(course)
		}
		ctx.body = result
	}

	// 获取班课信息
	async selcetCourseInfoByCourseId() {
		const { ctx } = this;
		const courseId = ctx.query.courseId;
		const result = await ctx.service.course.selcetCourseInfoByCourseId(courseId)
		ctx.body = result
	}


}

module.exports = AppController;