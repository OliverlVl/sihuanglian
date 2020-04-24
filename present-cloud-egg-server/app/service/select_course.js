'use strict';

const Service = require('egg').Service;

class SelectCourseService extends Service {
	// 学生加入班课
	async addCourse(user_id, course_number){
		const { ctx } = this;
		const select_course = new ctx.model.SelectCourse
		select_course.course_id = course_number
		select_course.student_id = user_id
		
		console.log(select_course)
		// const result = await ctx.model.SelectCsourse.create(select_course)
		console.log("select_course====")
	}
	
}

module.exports = SelectCourseService;