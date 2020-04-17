'use strict';

const Service = require('egg').Service;

class LoginService extends Service {

    // 登录
    async login(login) {
        // this.ctx.model 调用model .login (对象,根据model文件名(首字母大写))
        const { ctx } = this
        // console.log("LoginService: " + login.name )
        const result = await ctx.model.Login.findOne({
            where: { 
                login_name: login.name,
                login_password: login.password
            }, 
            // attributes: ['login_id', 'login_type'] // 指定元素
        })
        // .then(result => {
        //     console.log(result)
        // }).catch(err => {
        //     console.log(err)
        // });
        if(result == null){
            return false // 用户密码错误
        } else{
            // console.log(result.dataValues)
            return result.dataValues
        }
    }

    // 注册
}

module.exports = LoginService;