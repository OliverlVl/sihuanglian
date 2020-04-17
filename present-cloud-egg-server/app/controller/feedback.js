'use strict';

const Controller = require('egg').Controller;

class FeedbackController extends Controller {
async index() {
	const { ctx } = this;
	ctx.body = 'hi, egg';
}
}

module.exports = FeedbackController;