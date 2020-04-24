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

	// 根据code增加记录
	async insertDictionaryDetail() {
		const { ctx } = this
		// post 数据
		const info = ctx.request.body
		console.log(info)
		const result = await ctx.service.dictionaryDetail.insertDictionaryDetail(
			info.code,
			info.item_key,
			info.item_value,
			info.order_number,
			info.is_default,
			info.dictionary_id
		)
		ctx.body = result
	}

	// 根据id删除记录
	async deleteDictionaryDetail() {
		const { ctx } = this
		// get 传值
		const id = ctx.query.idid
		const result = await ctx.service.dictionaryDetail.deleteDictionaryDetail(id)
		ctx.body = result
	}



}

module.exports = DictionaryDetailController;
