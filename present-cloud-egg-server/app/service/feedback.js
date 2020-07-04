'use strict';

const Service = require('egg').Service;

class FeedbackService extends Service {
	async index() {

	}

	// 获取当前时间
	getNowFormatDate  () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var hours = date.getHours();
        if(hours >=0 && hours <=9){
            hours = "0" + hours;
        }
        var minutes = date.getMinutes();
        if(minutes >=0 && minutes <=9){
            minutes = "0" + minutes;
        }
        var seconds = date.getSeconds();
        if(seconds >=0 && seconds <=9){
            seconds = "0" + seconds;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + hours + seperator2 + minutes
                + seperator2 + seconds;
        return currentdate;
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
			content: feedbackMsg.content,
			create_time: this.getNowFormatDate(),
			creator: userId,
			update_time: this.getNowFormatDate(),
			updater: userId
		})
		// console.log(this.getNowFormatDate())
		if (result == null) {
			return {
				code: -1,
				msg: "添加失败"
			} // 错误
		}
		return result.dataValues;
	}
}

module.exports = FeedbackService;