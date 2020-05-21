'use strict';

const Service = require('egg').Service;
// 引入加密
const crypto = require('crypto');

class LoginService extends Service {


    // 登录
    // async login(login) {
    //     // this.ctx.model 调用model .login (对象,根据model文件名(首字母大写))
    //     const { ctx } = this
    //     // console.log("LoginService: " + login.name )
    //     const result = await ctx.model.Login.findOne({
    //         where: {
    //             login_name: login.name,
    //             login_password: login.password
    //         },
    //         // attributes: ['login_id', 'login_type'] // 指定元素
    //     })
    //     // .then(result => {
    //     //     console.log(result)
    //     // }).catch(err => {
    //     //     console.log(err)
    //     // });
    //     if (result == null) {
    //         return false // 用户密码错误
    //     } else {
    //         // console.log(result.dataValues)
    //         return result.dataValues
    //     }
    // }
    async login(loginMsg) {
        const { ctx } = this;
        const res = {};
        // 在当前数据库中验证此用户思否存在
        const queryResult = await ctx.model.Login.findOne({
            where:{
                login_name: loginMsg.account,
            }
        });
        if (!queryResult) {
            res.code = -2;
            res.msg = '用户不存在，请前去注册';
            res.data = {};
            res.status = 'failed';
        } else {
            const result = await ctx.model.Login.findOne({
                where:{
                    login_name: loginMsg.account,
                    login_password: loginMsg.password
                }
            });
            if (!result) {
                res.code = -1;
                res.msg = '用户密码不正确';
                res.data = {};
                res.status = 'failed';
            } else {
                // 签发token
                const token = this.app.jwt.sign({
                    account: result.login_name,
                },
                    this.app.config.jwt.secret, {
                    expiresIn: 60 * 60,
                });
                res.data = result;
                res.code = 1;
                res.token = token;
                res.status = 'ok';
            }
        }
        return res;
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
    async selectUser(user) {
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
    async updatePassword(md5Password, user) {
        const { ctx } = this;
        const result = await ctx.model.Login.update({
            login_password: md5Password
        }, {
            where: { login_password: user.name }
        })
        return result;
    }





}

module.exports = LoginService;
