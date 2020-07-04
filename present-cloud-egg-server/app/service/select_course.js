'use strict';

const Service = require('egg').Service;

class SelectCourseService extends Service {

	// 获取十条班课信息
	async selectCourInfoByPage(page) {
		const { ctx } = this
		var result = []
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
				result.push(container.dataValues)
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

		// 检查是否有已加入班课
		const selectCourse = await ctx.model.SelectCourse.findOne({
			where: {
				student_id: student_id,
				course_id: course_id
			}
		})
		if (selectCourse != null) {
			return {
				code: -1,
				msg: "班课已存在"
			}
		}

		// 创建记录
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
				code: -2,
				msg: "加入失败"
			}
		} else {
			return {
				code: 200,
				msg: "加入成功"
			}
		}

	}

	// 单次学生签到详情接口
	async singleSignInRecord(teacherSignId, courseId) {
		const { ctx } = this;
		// 根据课程id查询所有学生
		const selectCourse = await ctx.model.SelectCourse.findAll({
			where: {
				course_id: courseId
			}
		})
		for (var i = 0; i < selectCourse.length; i++) {

			// 根据教师签到id和学生id获取学生单次签到信息
			var signIn = await ctx.model.SignIn.findOne({
				where: {
					teacher_sign_id: teacherSignId,
					student_id: selectCourse[i].student_id
				}
			})
			if (signIn != null) {
				selectCourse[i].dataValues["distance"] = signIn.distance
				selectCourse[i].dataValues["status"] = 1 // 已签到
			} else {
				selectCourse[i].dataValues["status"] = 0 // 缺勤
			}

			// 根据学生id获取学生信息
			var student = await ctx.model.Student.findOne({
				where: {
					student_id: selectCourse[i].student_id
				}
			})
			selectCourse[i].dataValues["name"] = student.student_name // 姓名
			selectCourse[i].dataValues["number"] = student.student_number // 学号


			// 删除不要的属性
			delete selectCourse[i].dataValues.select_course_id
			delete selectCourse[i].dataValues.course_experience_point
			delete selectCourse[i].dataValues.create_time
			delete selectCourse[i].dataValues.creator
			delete selectCourse[i].dataValues.updater
			delete selectCourse[i].dataValues.update_time

			// console.log(result[i])
		}
		return selectCourse

	}


	// 学生退出班课
	async quitCourse(student_id, course_id) {
		const { ctx } = this;

		// // 检查是否有已加入班课
		// const selectCourse = await ctx.model.SelectCourse.findOne({
		// 	where: {
		// 		student_id: student_id,
		// 		course_id: course_id
		// 	}
		// })
		// if (selectCourse != null) {
		// 	return {
		// 		code: -1,
		// 		msg: "班课已存在"
		// 	}
		// }
		// 删除选课记录
		const result = await ctx.model.SelectCourse.destroy({
				where: {
					student_id: student_id,
					course_id: course_id
				}
		})
		// 删除签到记录
		// 找到老师发布的签到id
		const teacherSignInId = await ctx.model.TeacherSignIn.findOne({
			where: {
				course_id: course_id
			}
		})
		console.log(teacherSignInId.teacher_sign_id)
		// 删除签到信息
		const signInInfo = await  ctx.model.SignIn.destroy({
			where: {
				student_id: student_id,
				teacher_sign_id: teacherSignInId.teacher_sign_id
			}
		})

		if (result == null) {
			// 创建失败
			return {
				code: -2,
				msg: "退出失败"
			}
		} else {
			return {
				code: 200,
				msg: "退出成功"
			}
		}

	}



}

module.exports = SelectCourseService;