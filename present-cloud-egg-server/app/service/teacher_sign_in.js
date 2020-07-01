'use strict';

const { sign } = require('jsonwebtoken');

const Service = require('egg').Service;

class TeacherSignInService extends Service {

	// 教师发起签到
	async launchSignIn(teacherId, courseId, longitude, latitude) {
		const { ctx } = this;
		var now = new Date();
		const result = await ctx.model.TeacherSignIn.create({
			course_id: courseId,
			longitude: longitude,
			latitude: latitude,
			teacher_id: teacherId,
			state: 1,
			create_time: now
		});

		console.log(result)
		if (result != null) {
			return {
				code: 200,
				msg: "签到成功"
			}
		} else {
			return {
				code: -1,
				msg: "签到失败"
			}
		}
	}

	// 结束签到
	async signInEnd(teacherSignId) {
		const { ctx } = this;
		const result = await ctx.model.TeacherSignIn.update(
			{
				state: 0
			},
			{
				where: {
					teacher_sign_id: teacherSignId
				}
			}
		)
		if (result != 0) {
			return {
				code: 200,
				msg: "结束签到成功"
			}
		} else {
			return {
				code: -3,
				msg: "结束签到失败"
			}
		}
	}


	//a)签到记录接口
	/**
	 * 根据课程id在教师签到表获取签到时间以及签到id
	 * 根据签到id在学生签到表中获取签到学生人数
	 * 根据课程id在选课表中查询学生总人数
	 * @param {*} courseId 
	 */
	async signInRecord(courseId) {
		const { ctx } = this

		var result = await ctx.model.TeacherSignIn.findAll({
			where: {
				course_id: courseId,
			},
		})
		console.log(result.length)

		if(result.length == 0){
			return {
				code: -1,
				msg: "班课不存在"
			}
		}

		for (var i = 0; i < result.length; i++) {
			var signIn = await ctx.model.SignIn.findAll({
				where: {
					teacher_sign_id: result[i].teacher_sign_id
				}
			})
			result[i].dataValues["signInNumber"] = signIn.length

			var selectCourse = await ctx.model.SelectCourse.findAll({
				where: {
					course_id: courseId
				}
			})
			result[i].dataValues["noSignInNumber"] = selectCourse.length - signIn.length
		}
		return result
	
	}

}

module.exports = TeacherSignInService;