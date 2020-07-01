'use strict';

const Service = require('egg').Service;

class FeedbackService extends Service {
	async index() {

	}

	// 添加反馈信息
	async addFeedback(feedbackMsg) {
		const { ctx } = this;
		console.log(feedbackMsg) // courseId 还没用到
		const userId = 1;  // 当前用户Id
		const role = 0 // 
		const result = await ctx.model.Feedback.create({
			user_id: userId,
			role: role,
			content: feedbackMsg.content 
		})
		if (result == null) {
			return false // 错误
		}
		return result.dataValues;
	}
}

module.exports = FeedbackService;