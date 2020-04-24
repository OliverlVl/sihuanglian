'use strict';

const Service = require('egg').Service;

class SelectCourseService extends Service {
	// 学生加入班课
	async addCourse(student_id, course_id){
		const { ctx } = this;
		const select_course = new ctx.model.SelectCourse
		select_course.student_id = student_id
		select_course.course_id = course_id
		// 默认值
		select_course.course_experience_point = 0
		
		// console.log(select_course)
		const result = await ctx.model.SelectCourse.create(select_course.dataValues)
		// console.log(result==null)
		if(result == null ){
			// 创建失败
			return {
				code: -1,
				msg: "加入失败"
			}
		} else{
			return {
				code: 200,
				msg: "加入成功"
			}
		}
		
	}
	
}

module.exports = SelectCourseService;