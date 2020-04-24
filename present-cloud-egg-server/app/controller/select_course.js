'use strict';

const Controller = require('egg').Controller;

class SelectCourseController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	// 学生加入班课
	async addCourse() {
		const { ctx } = this
		// user_id 从session中获取
		const user_id = 1
		// course_number 由Get传入
		const c_id = ctx.query
		const result = await ctx.service.selectCourse.addCourse(user_id, c_id.course_id)
		ctx.body = result
	}
}

module.exports = SelectCourseController;