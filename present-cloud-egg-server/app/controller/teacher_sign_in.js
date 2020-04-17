'use strict';

const Controller = require('egg').Controller;

class TeacherSignInController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}
}

module.exports = TeacherSignInController;