'use strict';

const Controller = require('egg').Controller;

class DictionaryDetailController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	// 查询字典 详情
	async selectDictionaryDetail() {
		const { ctx } = this
		// get 传值
		const code = ctx.query.code
		const result = await ctx.service.dictionaryDetail.selectDictionaryDetail(code)
		// 返回对象数组
		ctx.body = result
	}

	// 根据id修改item_value
	async updateDictionaryDetail() {
		const { ctx } = this
		// post 数据
		const info = ctx.request.body
		console.log(info)
		const result = await ctx.service.dictionaryDetail.updateDictionaryDetail(
			info.detail_id,
			info.item_value
		)
		ctx.body = result
	}
}

module.exports = DictionaryDetailController;
