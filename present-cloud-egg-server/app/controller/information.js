'use strict';

const Controller = require('egg').Controller;

class InformationController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}
}

module.exports = InformationController;