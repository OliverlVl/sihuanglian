'use strict';

const Service = require('egg').Service;

class SignInService extends Service {

	//b)学生参与签到接口
	async signIn(signMsg) {
		const { ctx } = this;
		console.log(signMsg) // courseId 还没用到
		const result = await ctx.model.SignIn.create({
			longitude: signMsg.longitude,
			latitude: signMsg.latitude,
		})
		if (result == null) {
			return false // 用户不存在
		}
		return result.dataValues;

	}
}

module.exports = SignInService;