'use strict';

const Service = require('egg').Service;

class RoleService extends Service {

	//获取所有角色
	async selectRoleAll() {
		const { ctx } = this
		const result = await ctx.model.role.findAll()
		return result;
	}

	//查询具体id角色信息
	async selectRoleById(roleId) {
		const { ctx } = this
		const result = await ctx.model.role.findOne({
			where: {
				id: roleId
			}
		})
		if (result != 0) {
			return result
		} else {
			return {
				code: -1,
				msg: "查询失败"
			}
		}
	}


	// 添加角色
	async insertRole(role_name, role_type, detail) {
		const result = await ctx.model.role.create({
			role_name: role_name,
			role_type: role_type,
			detail: detail
		})
		if (result[0] != 0) {
			return {
				code: 200,
				msg: "增加成功"
			}
		} else {
			return {
				code: -1,
				msg: "增加失败"
			}
		}
	}


	// 修改角色
	async updateRole(id, role_name, role_type, detail) {
		const { ctx } = this
		const result0 = await ctx.model.SystemParameter.update(
			{
				role_name: role_name,
				role_type: role_type,
				detail: detail
			},
			{
				where: {
					id: id
				}

			})

		if (result0 != 0) {
			return {
				code: 200,
				msg: "修改成功"
			}
		} else {
			return {
				code: -1,
				msg: "修改失败"
			}
		}
	}


	// 根据id删除角色
	async deleteRoleById(id) {
		const { ctx } = this
		const result = await ctx.model.role.destroy({
			where: {
				id: idid
			}
		})
		if (result != 0) {
			return result
		} else {
			return {
				code: -1,
				msg: "删除失败"
			}
		}
	}



}

module.exports = RoleService;