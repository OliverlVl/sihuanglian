'use strict';

const Service = require('egg').Service;

class SignInService extends Service {

	//b)学生参与签到接口
	async signIn(user) {
		const { ctx } = this;
		const result = await ctx.model.Login.findOne({
			where: {
				login_name: user.name,
			},
		})
		if (result == null) {
			return false // 用户不存在
		}
		return result.dataValues;

	}
}

module.exports = SignInService;