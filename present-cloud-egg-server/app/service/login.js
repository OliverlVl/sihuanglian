'use strict';

const Service = require('egg').Service;
// 引入加密
const crypto = require('crypto');

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
        if (result == null) {
            return false // 用户密码错误
        } else {
            // console.log(result.dataValues)
            return result.dataValues
        }
    }

    // 注册
    async register(user) {
        const { ctx } = this;
        console.log(JSON.stringify(user))
        const result = await ctx.model.Login.create(user);
        return result.dataValues;
    }

    // 专门对数据进行md5加密的方法，输入明文返回密文
    getMd5Data(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }




    //查找用户
    async selectUser(user){
        const { ctx } = this;
        const result = await ctx.model.Login.findOne({
            where: {
                login_name: user.name,
            },
        })
        if (result == null) {
            return false // 用户不存在
        } 
        return result.dataValues;
        
    }
    
    // 修改密码
    async updatePassword(password){
        const { ctx } = this;
        const result = await ctx.model.Login.update(password,
            {
                where: {
                    login_password: password
                }
            })
        return result;


    }




    
}

module.exports = LoginService;
