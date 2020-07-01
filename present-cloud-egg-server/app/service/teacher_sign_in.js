'use strict';

const Service = require('egg').Service;

class TeacherSignInService extends Service {

	// 教师发起签到
	async launchSignIn(teacherId, coureseId, longitude, latitude) {
		const { ctx } = this;
		var now = new Date();
		const result = await ctx.model.TeacherSignIn.create({
			courese_id: coureseId,
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


	// //a)签到记录接口
	// async getSignInRecordByCourseId(courseId) {
	// 	const { ctx } = this
	// 	const result = await ctx.model.SignIn.findAll({
	// 		where: {
	// 			course_teacher_id: courseId,
	// 		},
	// 	})
	// 	console.log(result)
	// 	if (result != null) {
	// 		return result
	// 	} else {
	// 		return {
	// 			code: -1,
	// 			msg: "班课不存在"
	// 		}
	// 	}

	// }

}

module.exports = TeacherSignInService;