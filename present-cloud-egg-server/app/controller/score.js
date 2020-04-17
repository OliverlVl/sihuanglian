'use strict';

const Controller = require('egg').Controller;

class ScoreController extends Controller {
async index() {
	const { ctx } = this;
	ctx.body = 'hi, egg';
}
}

module.exports = ScoreController;