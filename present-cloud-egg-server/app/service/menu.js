'use strict';

const Service = require('egg').Service;

class MenuService extends Service {

	// 根据id 获取一个 页面，按钮，
	async findOneById(id) {
		const { ctx } = this
		const result = await ctx.model.Menu.findOne({
			where: {
				id: id,
			},
		})
		if (result == null) {
			return {
				code: -1,
				msg: "不存在"
			}
		}
		return result.dataValues;
	}


	// 获取所有菜单 (一级菜单)
	async selectMenuAll() {
		const { ctx } = this
		const result = await ctx.model.Menu.findAll({
			where: {
				layer: 1,
			},
		}
		)
		console.log('#######菜单service##########')
		// 对所有一级菜单循环
		for (const menu of result) {
			console.log(menu.dataValues)
			console.log(menu.dataValues.sub)
			if(menu.dataValues.sub != null){
				var sub1 = menu.dataValues.sub.split('a');
				console.log(sub1)
				menu.dataValues.sub = [] // 用以赋值
				// 对所有二级菜单循环
				for (const pageId of sub1) {

					const page = await this.findOneById(pageId)
					// console.log(page)
					menu.dataValues.sub.push(page) // sub添加查到的数据
					console.log('测试')
					// console.log(menu.dataValues)
	
					if (page.sub != undefined) { // 重点 记得先判断
						console.log(page.sub)
						var sub2 = page.sub.split('a');
						console.log('SUB222222222222')
						console.log(sub2)
						page.sub = []
						// 对三级菜单循环
						if (sub2 != null) {
							for (const buttonId of sub2) {
								const button = await this.findOneById(buttonId)
								// console.log('++++++++++++测试二++++++')
								// console.log(button)
								page.sub.push(button)
							}
						}
					}
	
	
	
				}
			}
			
		}

		return result;
	}


	// 根据id删除菜单
	async deleteMenu(id) {
		const { ctx } = this
		console.log('删除id号====')
		console.log(id)
		const result = await ctx.model.Menu.findOne({
			where: {
				id: id
			}
		})
		// console.log(result.dataValues)
		if( result != null ) {
			const sub = result.sub;
			console.log(sub)
			if (sub == null) {
				//删除
				const result1 = await ctx.model.Menu.destroy({
					where: {
						id: id
					}
				})
				return {
					code: 200,
					msg: "删除成功"
				}
			} else {
			
				const sub1 = result.sub
				console.log(result.sub)
				console.log(sub1)
				const arr = sub1.split('a')
				console.log(arr)
				var j = 0
				var len = arr.length
				for (j = 0; j < len; j++) {
					var result2 = await this.deleteMenu(arr[j])
				}
				result2 = await ctx.model.Menu.destroy({
					where: {
						id: id
					}
				})
				return {
					code: 200,
					msg: "删除成功"
				}
			}
		}
		
		return {
			code: 200,
			msg: "删除成功"
		}

	}


	// 增加菜单
	async insertMenu(name) {
		const { ctx } = this
		// var sub = '';
		// var j = 0
		// var len = subArry.length
		// for (j = 0; j < len; j++) {
		// 	sub.concat(subArry[j]);
		// }
		// console.log(subArry)
		const result = await ctx.model.Menu.create({
			name: name,
			state: 1,
			layer: 1,
			// sub: subArry,
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
	async insertPage(menuname, supermenu) {
		const { ctx } = this
		// var sub = '';
		// for (j = 0, len = buttons.length; j < len; j++) {
		// 	sub.concat(buttons[j]);
		// }
		const result = await ctx.model.Menu.create({
			name: menuname,
			state: 1,
			layer: 2,
			// sub: buttons,
		})
		// 查找id
		const page = await ctx.model.Menu.findOne({
			where: {
				name: menuname,
			}
		});
		// 父菜单修改sub
		console.log(page.id)
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
	async updateSub(superMenu, pageId) {
		const { ctx } = this
		var result = await ctx.model.Menu.findOne({
			where: {
				name: superMenu
			}
		})
		var sub = result.sub;
		console.log(sub)
		if(sub != null){
			sub = sub.concat("a", pageId.toString())
		}else{
			sub = pageId.toString()
		}
		
		result = await ctx.model.Menu.update({
			sub: sub
		}, {
			where: { 
				name: superMenu
			}
		})
		return result


	}


	// 插入button
	async insertButton(buttonName, supermenu) {
		const { ctx } = this
		const result = await ctx.model.Menu.create({
			name: buttonName,
			state: 1,
			layer: 3,
		})
		// 查找id
		const button = await ctx.model.Menu.findOne({
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