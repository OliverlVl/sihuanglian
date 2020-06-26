'use strict';

const Service = require('egg').Service;

class MenuService extends Service {
	async index() {

	}

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
	async findAll(){
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
}

module.exports = MenuService;