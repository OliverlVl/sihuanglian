'use strict';

const Service = require('egg').Service;

class MenuService extends Service {

	// 根据id删除菜单
	async deleteMenu(id) {
		const { ctx } = this
		const result = await ctx.model.menu.findOne({
			where: {
				id: id
			}
		})
		const sub = result.sub;
		if (sub == null) {
			//删除
			result = await ctx.model.menu.destroy({
				where: {
					id: id
				}
			})
			return result
		} else {
			const sub1 = result.sub
			const arr = sub1.split('a')
			for (j = 0, len = arr.length; j < len; j++) {
				result = await this.deleteMenu(arr[j])
			}
			result = await ctx.model.menu.destroy({
				where: {
					id: id
				}
			})
			return result
		}

	}


	// 增加菜单
	async insertMenu(name, subArry) {
		const { ctx } = this
		const sub = '';
		for (j = 0, len = subArry.length; j < len; j++) {
			sub.concat(subArry[j]);
		}
		const result = await ctx.model.menu.create({
			name: name,
			layer: 3,
			sub: sub,
		})
		// console.log(result[0])
		if (result != null) {
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

	// 增加页面
	async insertPage(menuname, supermenu, buttons) {
		const { ctx } = this
		const sub = '';
		for (j = 0, len = buttons.length; j < len; j++) {
			sub.concat(buttons[j]);
		}
		const result = await ctx.model.menu.create({
			name: menuname,
			layer: 2,
			sub: buttons,
		})
		// 查找id
		const page = await ctx.model.Login.findOne({
			where: {
				name: menuname,
			}
		});
		// 父菜单修改sub
		const result1 = await this.updateSub(supermenu, page.id)

		if (result1 != null) {
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


	// 修改sub
	async updateSub(superMenuId, pageId) {
		const result = await ctx.model.menu.findOne({
			where: {
				id: superMenuId
			}
		})
		const sub = resutl.sub;
		sub.concat("a", pageId)
		const result = await ctx.model.menu.update({
			sub: sub
		}, {
			where: { id: superMenuId }
		})
		return result


	}


	// 插入button
	async insertButton(buttonName, supermenu) {
		const { ctx } = this
		const result = await ctx.model.menu.create({
			name: buttonName,
			layer: 3,
		})
		// 查找id
		const button = await ctx.model.Login.findOne({
			where: {
				name: buttonName,
			}
		});
		// 父菜单修改sub
		const result1 = await this.updateSub(supermenu, button.id)

		if (result1 != null) {
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





}

module.exports = MenuService;