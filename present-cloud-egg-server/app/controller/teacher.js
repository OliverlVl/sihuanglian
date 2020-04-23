'use strict';

const Controller = require('egg').Controller;

class TeacherController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	// 完善(修改)老师信息 (传入老师 id)
	async updateTeacherInfo() {
		const { ctx } = this;
		const teacher = ctx.request.body;
		const result = await ctx.service.teacher.updateTeacherInfo(teacher);
		// 返回修改记录状态 1: 成功; 0: 失败
		ctx.body = result[0];
	}

	
}

module.exports = TeacherController;