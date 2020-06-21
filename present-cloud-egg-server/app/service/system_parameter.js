'use strict';

const sign_in = require('../model/sign_in');

const Service = require('egg').Service;

class SystemParameterService extends Service {

    // 查询系统参数
    async selcetSystemParameterAll() {
        const { ctx } = this
        const result = await ctx.model.SystemParameter.findAll()
        return result;
    }

    // 修改某个系统参数值
    async updateSystemParameter(exp_value, distance_value) {
        const { ctx } = this
        // result 返回数据条数
        // 修改经验值
        const result0 = await ctx.model.SystemParameter.update(
            {
                parameter_value: exp_value
            },
            {
                where: {
                    parameter_name: exp
                }

            })
        // 修改签到距离
        const result1 = await ctx.model.SystemParameter.update(
            {
                parameter_value: distance_value
            },
            {
                where: {
                    parameter_name: distance
                }

            })
        // console.log(result[0])
        if (result0 != 0 & result1 != 0) {
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

}

module.exports = SystemParameterService;