'use strict';

const Service = require('egg').Service;

class SignInService extends Service {

	//b)学生参与签到接口
	async signIn(signMsg, studentId) {
		const { ctx } = this;

		// 通过课程id 查老师id
		const course = await ctx.model.Course.findOne({
			where: {
				course_id: signMsg.courseId
			}
		})
		// 通过老师id 查老师位置信息
		const teacherLocal = await ctx.model.TeacherSignIn.findOne({
			where: {
				course_id: signMsg.courseId,
				teacher_id: course.course_teacher_id,
				state: 1 // 1代表正在签到，2代表签到已结束
			}
		})
		if (teacherLocal == null) {
			return {
				code: -1,
				msg: "签到失败"
			}
		}
		//查看是否已签到
		const signIn = await ctx.model.SignIn.findOne({
			where: {
				student_id: studentId,
				teacher_sign_id: teacherLocal.teacher_sign_id
			}
		})
		if (signIn != null) {
			return {
				code: -2,
				msg: "已签到，不可重复签到"
			}

		}
		const longitude2 = teacherLocal.longitude
		const latitude2 = teacherLocal.latitude
		// 通过经纬度计算学生与老师的距离
		// 传入参数为 数值型 xxx.xxx
		const distance = await this.GetDistance(signMsg.latitude, signMsg.longitude, latitude2, longitude2)

		// 存学生位置信息
		await ctx.model.SignIn.create({
			student_id: studentId,
			longitude: signMsg.longitude,
			latitude: signMsg.latitude,
			distance: distance,
			teacher_sign_id: teacherLocal.teacher_sign_id

		})

		// return distance // 公里
		return {
			code: 1,
			msg: "签到成功",
			distance: distance
		}

		// if (result == null) {
		// 	return false // 用户不存在
		// }
		// return result.dataValues;

	}


	Rad(d) {
		return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
	}
	// 通过经纬度算距离
	async GetDistance(lat1, lng1, lat2, lng2) {

		var radLat1 = this.Rad(lat1);
		var radLat2 = this.Rad(lat2);
		var a = radLat1 - radLat2;
		var b = this.Rad(lng1) - this.Rad(lng2);
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
			Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		s = s * 6378.137;// EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000; //输出为公里
		//s=s.toFixed(4);
		return s;
	}




}

module.exports = SignInService;