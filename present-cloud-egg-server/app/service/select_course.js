'use strict';

const Service = require('egg').Service;

class SelectCourseService extends Service {

	// 获取十条班课信息
	async selectCourInfoByPage(page) {
		const { ctx } = this
		var result = {}
		for (var i = 0; i < 10; i++) {

			const container = await ctx.model.SelectCourse.findOne({
				where: {
					select_course_id: page
				}
			})
			console.log(container)
			if (container != null) {
				const student = await ctx.model.Student.findOne({
					where: {
						student_id: container.student_id
					}
				})
				// 添加学号和姓名
				container.dataValues['student_number'] = student.student_number
				container.dataValues['student_name'] = student.student_name
				const course = await ctx.model.Course.findOne({
					where: {
						course_id: container.course_id
					}
				})
				// 添加课程名
				container.dataValues['course_name'] = course.course_name

				// console.log(container.dataValues)
				result[i + 1] = container.dataValues
				page++;
			}

		}
		// console.log(result)

		return result;
	}

	//----------------------------------------------------------APP----------------------------------------------------------

	// 根据学生id获取选课信息
	async selectSeclectCourseByStudentId(studentId) {
		const { ctx } = this
		const result = await ctx.model.SelectCourse.findAll({
			where: {
				student_id: studentId
			}
		})
		return result
	}




	// 学生加入班课
	async addCourse(student_id, course_id) {
		const { ctx } = this;
		const select_course = new ctx.model.SelectCourse
		select_course.student_id = student_id
		select_course.course_id = course_id
		// 默认值
		select_course.course_experience_point = 0

		// console.log(select_course)
		const result = await ctx.model.SelectCourse.create(select_course.dataValues)
		// console.log(result==null)
		if (result == null) {
			// 创建失败
			return {
				code: -1,
				msg: "加入失败"
			}
		} else {
			return {
				code: 200,
				msg: "加入成功"
			}
		}

	}



}

module.exports = SelectCourseService;