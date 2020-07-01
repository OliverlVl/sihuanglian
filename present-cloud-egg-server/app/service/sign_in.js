'use strict';

const Service = require('egg').Service;

class SignInService extends Service {

	//b)学生参与签到接口
	async signIn(signMsg) {
		const { ctx } = this;

		// 存学生位置信息
		const result = await ctx.model.SignIn.create({
			longitude: signMsg.longitude,
			latitude: signMsg.latitude,
		})
		// 通过课程id 查老师id
		const course = await ctx.model.Course.findOne({
			where: {
				course_id: signMsg.courseId
			}
		})
		const tId = course.course_teacher_id
		console.log(tId)
		// 通过老师id 查老师位置信息
		const teacherLocal = await ctx.model.TeacherSignIn.findOne({
			where: {
				course_id: signMsg.courseId,
				teacher_id: tId
			}
		})
		console.log(signMsg.longitude)
		console.log(signMsg.latitude)

		const longitude2 =  teacherLocal.longitude
		const latitude2 =  teacherLocal.latitude
		console.log(longitude2)
		console.log(latitude2)
		// 通过经纬度计算学生与老师的距离
		// 传入参数为 数值型 xxx.xxx
		const distance = await this.GetDistance(signMsg.latitude, signMsg.longitude, latitude2, longitude2)
		console.log(distance)

		return distance // 公里

		// if (result == null) {
		// 	return false // 用户不存在
		// }
		// return result.dataValues;

	}

	
	Rad(d){
		return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
	}
	// 通过经纬度算距离
	async GetDistance(lat1,lng1,lat2,lng2){
 
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(lat2);
        var a = radLat1 - radLat2;
        var  b = this.Rad(lng1) - this.Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s *6378.137 ;// EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000; //输出为公里
        //s=s.toFixed(4);
        return s;
	}



	// 单次学生签到详情接口
	async singleSignInRecord(teacherSingId){
		const { ctx } = this;
		// 
	}


}

module.exports = SignInService;