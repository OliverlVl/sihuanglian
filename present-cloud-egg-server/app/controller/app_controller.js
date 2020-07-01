'use strict';

const Controller = require('egg').Controller;

class AppController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}


	// ------------------------登入------------------------

	// 登录方法
	async login() {
		const { ctx } = this;
		const loginMsg = ctx.request.body; // request.body获取前端post值
		const result = await ctx.service.login.appLogin(loginMsg);
		ctx.body = result;
	}

	// 注册方法
	async register() {
		const { ctx } = this;
		const registerMsg = ctx.request.body;
		const result = await ctx.service.login.appRegister(registerMsg);
		ctx.body = result;
	}

	// 忘记密码
	async appResetPassword() {
		const { ctx } = this;
		const PasswordMsg = ctx.request.body;
		const result = await ctx.service.login.appResetPassword(
			PasswordMsg.phone,
			PasswordMsg.newPwd,
		)
		ctx.body = result
	}

	// ------------------------学生主页页面------------------------

	// 获取课程表
	async selcetCourseList() {
		const { ctx } = this;
		const token = JSON.parse(ctx.request.header.token);
		//根据学生id获取课程信息
		const selectCourse = await ctx.service.selectCourse.selectSeclectCourseByStudentId(token.id)

		console.log(selectCourse.length)
		//根据课程id获取课程信息
		var result = []
		for (var i = 0; i < selectCourse.length; i++) {
			const course = await ctx.service.course.selcetCourseInfoByCourseId(selectCourse[i].course_id)
			result.push(course)
		}
		ctx.body = result
	}

	// 获取班课信息
	async selcetCourseInfoByCourseId() {
		const { ctx } = this;
		const courseId = ctx.query.courseId;
		const result = await ctx.service.course.selcetCourseInfoByCourseId(courseId)
		ctx.body = result
	}



	// ------------------------学生课程信息页面------------------------

	// b)学生参与签到接口
	async signIn() {
		const { ctx } = this;
		const signMsg = ctx.request.body; // request.body获取前端post值
		const result = await ctx.service.signIn.signIn(signMsg);
		ctx.body = result;
	}

	// ------------------------学生签到详情页面------------------------






	// ------------------------更改手机号码页面------------------------

	//验证密码
	async verifyPassword() {
		const { ctx } = this;
		const password = ctx.query.password;
		const token = JSON.parse(ctx.request.header.token);
		const result = await ctx.service.login.verifyPassword(token.id, password)
		ctx.body = result
	}

	//验证码

	//更改手机号
	async updatePhone() {
		const { ctx } = this;
		const phoneMsg = ctx.request.body;
		const token = JSON.parse(ctx.request.header.token);
		const result = await ctx.service.student.updatePhone(token.id, phoneMsg.newPhone)
		ctx.body = result
	}

	// ------------------------修改密码页面------------------------

	// app修改密码
	async changePassword() {
		const { ctx } = this;
		const passwordMsg = ctx.request.body;
		const token = JSON.parse(ctx.request.header.token);
		const result = await ctx.service.login.changePassword(
			token.id,
			passwordMsg.oldPwd,
			passwordMsg.newPwd
		)
		ctx.body = result

	}

	// ------------------------用户反馈页面------------------------
	async feedback() {
		const { ctx } = this;
		const feedbackMsg = ctx.request.body; // request.body获取前端post值
		const result = await ctx.service.feedback.addFeedback(feedbackMsg);
		ctx.body = result;
	}


  //------------------------10.教师主页页面------------------------
  //a)课程表接口：???
  async courseList() {
	const { ctx } = this;
	var teacherId = ctx.query.teacherId;// request.body获取前端post值
	const result = await ctx.service.course.selcetCourseInfoByTeacher(teacherId);
	ctx.body = result;
  }

  //------------------------11.创建班课页面------------------------
  // 创建班课接口：
  async createCourse() {
	const { ctx } = this;
	const courseMsg = ctx.request.body; // request.body获取前端post值
	const result = await ctx.service.course.createCourse(courseMsg);
	ctx.body = result;
  }	



  
  //------------------------13.签到记录页面------------------------
  //a)签到记录接口
  async signInRecord() {
	const { ctx } = this;
	const courseId  = ctx.query.courseId ;// request.body获取前端post值
	const result = await ctx.service.signIn.getSignInRecordByCourseId(courseId);
	ctx.body = result;
  }




}

module.exports = AppController;