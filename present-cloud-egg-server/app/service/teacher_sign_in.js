'use strict';

const Service = require('egg').Service;

class TeacherSignInService extends Service {
	async index() {

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