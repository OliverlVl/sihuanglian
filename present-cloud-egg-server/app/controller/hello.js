'use strict';

const Controller = require('egg').Controller;

class helloController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	// ------------------------登入------------------------

	// 登录方法
	async login() {
		const { ctx } = this;
		const loginMsg = ctx.request.body; // request.body获取前端post值
		const result = await ctx.service.login.login(loginMsg);
		ctx.body = result;
	}

	// 注册方法
	async register() {
		const { ctx } = this;
		const registerMsg = ctx.request.body;
		const result = await ctx.service.login.register(registerMsg);
		ctx.body = result;
	}

	// 修改密码
	// async updatePassword() {
	// 	const { ctx } = this;
	// 	const passwordMsg = ctx.request.body;
	// 	const result = await ctx.service.login.updatePassword(passwordMsg);
	// 	ctx.body = result;

	// }

	// ------------------------数据字典------------------------

	// 获取所有字典详情信息
	async selectDictionaryDetailAll() {
		const { ctx } = this;
		const result = await ctx.service.dictionaryDetail.selectDictionaryDetailAll();
		ctx.body = result;
	}

	// 查询具体id字典详情信息
	async selectDictionaryDetailById(id) {
		const { ctx } = this;
		const DictionaryDetailId = ctx.request.body;
		const result = await ctx.service.dictionaryDetail.selectDictionaryDetailById(DictionaryDetailId.detail_id);
		ctx.body = result;
	}

	// 查询字典详情
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
		const id = ctx.query.id
		const result = await ctx.service.dictionaryDetail.deleteDictionaryDetail(id)
		ctx.body = result
	}

	// ------------------------系统参数------------------------

	// 查询系统参数
	async selcetSystemParameterAll() {
		const { ctx } = this;
		const result = await ctx.service.systemParameter.selcetSystemParameterAll();
		ctx.body = result;

	}

	// 修改某个系统参数值
	async updateSystemParameter() {
		const { ctx } = this
		// post 数据
		const systemParameter = ctx.request.body
		const result = await ctx.service.systemParameter.updateSystemParameter(
			systemParameter.exp,
			systemParameter.distance
		)
		ctx.body = result
	}

	// ------------------------菜单管理------------------------








	// ------------------------角色------------------------







	

	// ------------------------用户------------------------







	// ------------------------课程管理------------------------












}

module.exports = helloController;