'use strict';

const Service = require('egg').Service;

class TeacherService extends Service {
	// 完善老师信息
	async updateTeacherInfo(teacher) {
		const { ctx } = this;
		const result = await ctx.model.Teacher.update(teacher,
			{
				where: {
					teacher_id: teacher.teacher_id
				}
			})
		return result;
	}

	// 
}

module.exports = TeacherService;