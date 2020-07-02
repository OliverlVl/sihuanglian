'use strict';

const { sign } = require('jsonwebtoken');

const Service = require('egg').Service;

class TeacherSignInService extends Service {

	// 学生签到记录
	async studentSignInInfo(courseId,studentId) {
		const { ctx } = this;
		// 根据课程id查找每一次签到记录
		var result = await ctx.model.TeacherSignIn.findAll({
			where: {
				course_id: courseId,
			},
		})
		// 在签到表中查找是否签到
		for (var i = 0; i < result.length; i++) {

			// 根据教师签到id 获取学生签到信息
			var signIn = await ctx.model.SignIn.findOne({
				where: {
					teacher_sign_id: result[i].teacher_sign_id,
					student_id: studentId
				}
			})

			if(signIn!= null){
				result[i].dataValues["status"] = 1 // 已签到
			}else{
				result[i].dataValues["status"] = 0 //未签到
			}

			// 删除不要的属性
			delete result[i].dataValues.longitude
			delete result[i].dataValues.latitude
			delete result[i].dataValues.state
			delete result[i].dataValues.creator
			delete result[i].dataValues.updater
			delete result[i].dataValues.update_time

		}
		return result


	}

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

		// 根据课程id获取每次签到信息
		var result = await ctx.model.TeacherSignIn.findAll({
			where: {
				course_id: courseId,
			},
		})

		if(result.length == 0){
			return {
				code: -1,
				msg: "班课不存在"
			}
		}

		const course = await ctx.model.Course.findOne({
			where:{
				course_id:courseId
			}
		})


		for (var i = 0; i < result.length; i++) {

			// 根据教师签到id 获取学生签到信息
			var signIn = await ctx.model.SignIn.findAll({
				where: {
					teacher_sign_id: result[i].teacher_sign_id
				}
			})

			// 成功签到人数
			result[i].dataValues["signInNumber"] = signIn.length

			// 总人数
			result[i].dataValues["studentTotalNumber"] = course.student_total_number

			// 删除不要的属性
			delete result[i].dataValues.longitude
			delete result[i].dataValues.latitude
			delete result[i].dataValues.state
			delete result[i].dataValues.creator
			delete result[i].dataValues.updater

			console.log(result[i])
		}
		return result
	
	}

	// 教师签到详情
	/**
	 * 查询课程总人数
	 * 查询成功签到人数
	 * @param {*} courseId 
	 */
	async teachrerSignInInfo(courseId){
		const { ctx } = this;

		// 根据课程id获取课程总人数
		const course = await ctx.model.Course.findOne({
			where:{
				course_id:courseId
			}
		})

		// 获取当前签到的id
		var teacherSignIn = await ctx.model.TeacherSignIn.findOne(
			{
				'order': [
					['teacher_sign_id', 'DESC'],
				]
			},
			{
				where:{
				course_id: courseId,
				}
				
			}
		)

		var signIn = await ctx.model.SignIn.findAll({
			where: {
				teacher_sign_id: teacherSignIn.teacher_sign_id
			}
		})
		
		return {

			signInNumber: signIn.length,
			studentTotalNumber: course.student_total_number		
		}



	}

}

module.exports = TeacherSignInService;