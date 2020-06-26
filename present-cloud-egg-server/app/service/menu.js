'use strict';

const Service = require('egg').Service;

class MenuService extends Service {


	
	// 根据id 获取一个 页面，按钮，
	async findOneById(id){
		const { ctx } = this
		const result = await ctx.model.Menu.findOne({
            where: {
                id: id,
            },
        })
        if (result == null) {
            return false // 不存在
        }
        return result.dataValues;
	}

	// 获取所有菜单 (一级菜单)
	async selectMenuAll(){
		const { ctx } = this
		const result = await ctx.model.Menu.findAll({
				where: {
					layer: 1,
				},
			}
		)
		console.log('#######菜单service##########')
		// 对所有一级菜单循环
		for (const menu of result){
				console.log(menu.dataValues)
				console.log(menu.dataValues.sub)
				var sub1 = menu.dataValues.sub.split('a');
				console.log(sub1)
				menu.dataValues.sub = [] // 用以赋值
				// 对所有二级菜单循环
				for(const pageId of sub1){
					const page = await this.findOneById(pageId)
					// console.log(page)
					menu.dataValues.sub.push(page) // sub添加查到的数据
					console.log('测试')
					// console.log(menu.dataValues)

					if(page.sub != undefined){ // 重点 记得先判断
						console.log(page.sub)
						var sub2 = page.sub.split('a');
						console.log('SUB222222222222')
						console.log(sub2)
						page.sub = []
						// 对三级菜单循环
						if(sub2 != null){
							for(const buttonId of sub2){
								const button = await this.findOneById(buttonId)
								// console.log('++++++++++++测试二++++++')
								// console.log(button)
								page.sub.push(button) 
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
		const result = await ctx.model.Menu.findOne({
			where: {
				id: id
			}
		})
		const sub = result.sub;
		if (sub == null) {
			//删除
			result = await ctx.model.Menu.destroy({
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
			result = await ctx.model.Menu.destroy({
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
		const result = await ctx.model.Menu.create({
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
		const result = await ctx.model.Menu.create({
			name: menuname,
			layer: 2,
			sub: buttons,
		})
		// 查找id
		const page = await ctx.model.Menu.findOne({
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
		const result = await ctx.model.Menu.findOne({
			where: {
				id: superMenuId
			}
		})
		const sub = resutl.sub;
		sub.concat("a", pageId)
		const result = await ctx.model.Menu.update({
			sub: sub
		}, {
			where: { id: superMenuId }
		})
		return result


	}


	// 插入button
	async insertButton(buttonName, supermenu) {
		const { ctx } = this
		const result = await ctx.model.Menu.create({
			name: buttonName,
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