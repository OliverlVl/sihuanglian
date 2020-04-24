'use strict';

const Service = require('egg').Service;

class DictionaryDetailService extends Service {
	// 查询字典 详情
	async selectDictionaryDetail(code) {
		const { ctx } = this
		const result = await ctx.model.DictionaryDetail.findAll({
			where: {
				code: code
			}
		})
		console.log(result)
		if (result != 0) {
			return result
		} else {
			return {
				code: -1,
				msg: "为空"
			}
		}
	}

	// 根据id修改item_value
	async updateDictionaryDetail(detail_id, item_value) {
		const { ctx } = this
		// result 返回数据条数
		const result = await ctx.model.DictionaryDetail.update(
			{
				item_value: item_value
			},
			{
				where: {
					detail_id: detail_id
				}

			})
		// console.log(result[0])
		if(result[0] != 0){
			return {
				code: 200,
				msg: "修改成功"
			}
		} else{
			return {
				code: -1,
				msg: "修改失败"
			}
		}
	}

}

module.exports = DictionaryDetailService;