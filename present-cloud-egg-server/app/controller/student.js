'use strict';

const Controller = require('egg').Controller;

class StudentController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	// 完善(修改)学生信息 (传入学生 id)
	async updateStudentInfo() {
		const { ctx } = this;
		const student = ctx.request.body;
		const result = await ctx.service.student.updateStudentInfo(student);
		// 返回修改记录状态 1: 成功; 0: 失败
		ctx.body = result[0];
	}
}

module.exports = StudentController;