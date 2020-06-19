'use strict';

const Service = require('egg').Service;
// 引入加密
const crypto = require('crypto');
const JWT = require('jsonwebtoken');

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
            where: {
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
                where: {
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
                // const token = this.app.jwt.sign({
                const token = JWT.sign({
                    account: result.login_name,
                },
                    this.config.jwts.secret, {
                    expiresIn: "30 days",
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
    // // MD5加密方法
    // async getMd5Data() {
    //     const { ctx } = this;
    //     // 斜杠传值
    //     ctx.body = await ctx.service.login.getMd5Data(ctx.params.data);
    // }



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
    async updatePassword(md5NewPassword, user) {
        const { ctx } = this;
        const result = await ctx.model.Login.update({
            login_password: md5NewPassword
        }, {
            where: { login_name: user.login_name }
        })
        return result;
    }




    //修改密码
    async updatePassword(passwordMsg) {
        const { ctx } = this;
        const updateMsg = ctx.request.body;
        const originalPassword = updateMsg.originalPassword; //原密码
        const newPassword = updateMsg.newPassword; //新密码

        //md5加密
        const md5OriginalPassword = await ctx.service.login.getMd5Data(originalPassword);

        //查找用户
        const user = await ctx.service.login.selectUser(updateMsg);

        //比较更新
        if (user == false) {
            ctx.body = { status: "用户不存在" }; //用户不存在
        } else if (md5OriginalPassword != user.login_password) {
            ctx.body = { status: "密码错误" }; //密码错误
        } else {
            const md5NewPassword = await ctx.service.login.getMd5Data(newPassword);
            const result = await ctx.service.login.updatePassword(md5NewPassword, user)
            ctx.body = { status: "修改成功" };
        }

    }



}

module.exports = LoginService;
