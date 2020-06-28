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
        // 为当前输入的密码加密 ### md5加密
        loginMsg.password = crypto.createHash('md5').update(loginMsg.password).digest('hex')
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
        console.log(JSON.stringify(user));
        // md5加密
        user.login_password =  crypto.createHash('md5').update(user.login_password).digest('hex');
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


    // 忘记密码
    async resetPassword(account,password,repassword){
        const { ctx } = this;
        if(password != repassword){
            return {
				code: -1,
				msg: "密码不一致"
			}
        }
        // 查找账户
        const container = await ctx.model.Login.findOne({
            where:{
                login_name:account
            }
        })

        if(container == null){
            return {
				code: -1,
				msg: "用户不存在"
			}
        }
        //加密
        const md5Password = await this.getMd5Data(password)
        // console.log(typeof(md5Password))

        console.log(typeof(container.user_id))
        const result = await ctx.model.Login.update(
            {
                login_password:md5Password
            },
            {
                where:{
                    user_id: container.user_id
                }

            }
        )
        if (result != 0) {
			return {
				code: 200,
				msg: "成功"
			}
		} else {
			return {
				code: -1,
				msg: "失败"
			}
		} 


    }

    // // 修改密码
    // async updatePassword(md5NewPassword, user) {
    //     const { ctx } = this;
    //     const result = await ctx.model.Login.update({
    //         login_password: md5NewPassword
    //     }, {
    //         where: { login_name: user.login_name }
    //     })
    //     return result;
    // }



    //修改密码
    // async updatePassword(passwordMsg) {
    //     const { ctx } = this;
    //     // const updateMsg = ctx.request.body;
    //     const originalPassword = passwordMsg.originalPassword; //原密码
    //     const newPassword = passwordMsg.newPassword; //新密码
        
    //     // 1.对原密码进行md5加密与数据库中密码比较
    //     //md5加密
    //     const md5OriginalPassword = await getMd5Data(originalPassword);
    //     //查找用户
    //     const user = await selectUser(passwordMsg);
    //     //比较更新
    //     if (user == false) {
    //          const result = { status: "用户不存在" }; //用户不存在
    //     } else if (md5OriginalPassword != user.login_password) {
    //          const result = { status: "密码错误" }; //密码错误
    //     } else {
    //         const md5NewPassword = await getMd5Data(newPassword);
    //         const result = await update({
    //             login_password: md5NewPassword
    //         }, {
    //             where: { login_name: user.login_name }
    //         })
    //         result = { status: "修改成功" };
    //     }
    //     return result;
    // }


}

module.exports = LoginService;
