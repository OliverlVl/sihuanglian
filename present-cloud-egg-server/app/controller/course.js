'use strict';

const Controller = require('egg').Controller;

class CourseController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	// 学生通过班课编号查找班课
	async selectCourse() {
		const { ctx } = this
		const num = ctx.query
		console.log(num.course_number)
		const result = await ctx.service.course.selectCourse(num.course_number);
		console.log(result)
		ctx.body = result
	}


}

module.exports = CourseController;