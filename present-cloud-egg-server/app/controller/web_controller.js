'use strict';

const Controller = require('egg').Controller;

class WebController extends Controller {

	// ------------------------登入------------------------

	// 登录方法
	async login() {
		const { ctx } = this;
		const loginMsg = ctx.query; 
		const result = await ctx.service.login.login(loginMsg);
		ctx.body = result;
	}

	// 注册方法
	async register() {
		const { ctx } = this;
		const registerMsg = ctx.query;
		const result = await ctx.service.login.register(registerMsg);
		ctx.body = result;
	}

	// 忘记密码
	async resetPassword() {
		const { ctx } = this;
		const passwordMsg = ctx.query;
		const result = await ctx.service.login.resetPassword(
			passwordMsg.account,
			passwordMsg.password,
			passwordMsg.repassword,
		)
		ctx.body = result
	}

	// ------------------------数据字典------------------------

	// 获取所有字典详情信息
	async selectDictionaryDetailAll() {
		const { ctx } = this;
		const result = await ctx.service.dictionaryDetail.selectDictionaryDetailAll();
		ctx.body = result;
	}

	// 查询具体id字典详情信息
	async selectDictionaryDetailById() {
		const { ctx } = this;
		const DictionaryDetailId = ctx.query;
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
		const info = ctx.query
		const result = await ctx.service.dictionaryDetail.updateDictionaryDetail(
			info.id,
			info.dataValue
		)
		ctx.body = result
	}

	// 根据code增加记录
	async insertDictionaryDetail() {
		const { ctx } = this
		// post 数据
		const info = ctx.query
		const result = await ctx.service.dictionaryDetail.insertDictionaryDetail(
			info.code,
			info.dataKey,
			info.dataValue,
			// info.order_number,
			// info.is_default,
			// info.dictionary_id
			1,
			0,
			0
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
		const systemParameter = ctx.query
		const result = await ctx.service.systemParameter.updateSystemParameter(
			systemParameter.exp,
			systemParameter.distance
		)
		ctx.body = result
	}

	// ------------------------菜单管理------------------------

	// 获取所有菜单 get
	async selectMenuAll() {
		const { ctx } = this
		// post 数据
		// const menu = ctx.request.body
		const result = await ctx.service.menu.selectMenuAll()


		ctx.body = result
	}

	// 删除菜单
	async deleteMenu() {
		const { ctx } = this
		// get 传值
		const id = ctx.query.id
		const result = await ctx.service.menu.deleteMenu(id)
		ctx.body = result
	}

	// 添加菜单
	async insertMenu() {
		const { ctx } = this
		// post 数据
		const menu = ctx.query
		console.log("添加菜单")
		console.log(menu)
		const result = await ctx.service.menu.insertMenu(
			menu.menuname
		)
		ctx.body = result
	}

	// 添加页面
	async insertPage() {
		const { ctx } = this
		// post 数据
		const page = ctx.query
		const result = await ctx.service.menu.insertPage(
			page.menuname,
			page.supermenu
		)
		ctx.body = result
	}

	// 添加按钮
	async insertButton() {
		const { ctx } = this
		// post 数据
		const button = ctx.query
		// for (j = 0, len = button.lengt; j < len; j++) {
		const result = await ctx.service.menu.insertButton(
			button.button,
			button.supermenu
		)
		// }
		ctx.body = result
	}

	// ------------------------角色------------------------

	// 获取所有角色
	async selectRoleAll() {
		const { ctx } = this;
		const result = await ctx.service.role.selectRoleAll();
		ctx.body = result;
	}

	// 根据id查询角色信息
	async selectRoleById() {
		const { ctx } = this;
		const roleId = ctx.query;
		const result = await ctx.service.role.selectRoleById(roleId.roleId);
		ctx.body = result;
	}

	// 添加角色
	async insertRole() {
		const { ctx } = this;
		const role = ctx.query;
		const result = await ctx.service.role.insertRole(
			role.name,
			role.type,
			role.detail
		)
		ctx.body = result
	}

	// 修改角色
	async updateRole() {
		const { ctx } = this
		// post 数据
		const role = ctx.query
		const result = await ctx.service.role.updateRole(
			role.id,
			role.name,
			role.type,
			role.detail
		)
		ctx.body = result
	}

	// 根据id删除角色
	async deleteRoleById() {
		const { ctx } = this
		// get 传值
		const id = ctx.query.id
		const result = await ctx.service.role.deleteRoleById(id)
		ctx.body = result
	}

	// ------------------------学生用户管理------------------------

	// 获取所有学生
	async selectStudentAll() {
		const { ctx } = this;
		const result = await ctx.service.student.selectStudentAll();
		ctx.body = result;
	}

	// 根据id查询学生信息
	async selectStudentById() {
		const { ctx } = this;
		const studentId = ctx.query.userId
		console.log(studentId)
		const result = await ctx.service.student.selectStudentById(studentId);
		ctx.body = result;
	}

	// 修改学生信息
	async updateStudent() {
		const { ctx } = this
		// post 数据
		const student = ctx.query
		// console.log(student)
		const result = await ctx.service.student.updateStudent(
			student.id,
			student.account,
			student.userName,
			student.sex,
			student.email,
			student.phone
		)
		ctx.body = result
	}

	// 根据id删除学生
	async deleteStudentById() {
		const { ctx } = this
		// get 传值
		const id = ctx.query.uid
		const result = await ctx.service.student.deleteStudentById(id)
		ctx.body = result
	}

	// ------------------------课程管理------------------------

	// 获取十条班课信息
	async selectCourInfoByPage() {
		const { ctx } = this;
		const page = ctx.query.page
		const result = await ctx.service.selectCourse.selectCourInfoByPage(page);
		ctx.body = result;
	}











}

module.exports = WebController;