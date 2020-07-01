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
        user.pwd = crypto.createHash('md5').update(user.pwd).digest('hex');
        // const result = await ctx.model.Login.create(user);
        // 1、添加用户相关信息 获取用户id (老师)
        const result = await ctx.model.Teacher.create({
            teacher_number: user.account,
            teacher_name: user.userName,
            teacher_telephone: user.phone,
            student_mailbox: user.email
        });
        // console.log("老师注册")
        // console.log(result.teacher_id)
        const userId = result.teacher_id;

        // 2、添加用户登录信息 
        // a、账号 老师 type:2
        await ctx.model.Login.create({
            login_name: user.account,
            login_password: user.pwd,
            login_type: 2,
            user_id: userId
        })

        // b、电话2
        await ctx.model.Login.create({
            login_name: user.phone,
            login_password: user.pwd,
            login_type: 2,
            user_id: userId
        })


        // c、邮箱
        await ctx.model.Login.create({
            login_name: user.email,
            login_password: user.pwd,
            login_type: 2,
            user_id: userId
        })


        if (result != null) {
            return {
                code: 200,
                msg: "注册成功"
            }
        } else {
            return {
                code: -1,
                msg: "注册失败"
            }
        }
        // return result.dataValues;

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





    // 忘记密码
    async resetPassword(account, password, repassword) {
        const { ctx } = this;
        if (password != repassword) {
            return {
                code: -1,
                msg: "密码不一致"
            }
        }
        // 查找账户
        const container = await ctx.model.Login.findOne({
            where: {
                login_name: account
            }
        })

        if (container == null) {
            return {
                code: -1,
                msg: "用户不存在"
            }
        }
        //加密
        const md5Password = await this.getMd5Data(password)
        // console.log(typeof(md5Password))
        const result = await ctx.model.Login.update(
            {
                login_password: md5Password
            },
            {
                where: {
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





    //----------------------------------------------------------app----------------------------------------------------------

    // 忘记密码
    async appResetPassword(account, password) {
        const { ctx } = this;
        // 查找账户
        const container = await ctx.model.Login.findOne({
            where: {
                login_name: account
            }
        })

        if (container == null) {
            return {
                code: -1,
                msg: "用户不存在"
            }
        }
        //加密
        const md5Password = await this.getMd5Data(String(password))
        // console.log(typeof(md5Password))
        const result = await ctx.model.Login.update(
            {
                login_password: md5Password
            },
            {
                where: {
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


    // app登录
    async appLogin(loginMsg) {
        const { ctx } = this;
        const res = {};
        // 为当前输入的密码加密 ### md5加密
        loginMsg.password = crypto.createHash('md5').update(loginMsg.password).digest('hex')
        console.log(loginMsg)
        // 在当前数据库中验证此用户思否存在
        const queryResult = await ctx.model.Login.findOne({
            where: {
                login_name: loginMsg.phone,
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
                    login_name: loginMsg.phone,
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

    // app注册
    async appRegister(user) {
        const { ctx } = this;
        console.log(JSON.stringify(user));
        // md5加密
        user.password = crypto.createHash('md5').update(user.password).digest('hex');
        // const result = await ctx.model.Login.create(user);
        var userId = 0
        var result
        if (user.role == 2) { // role==2老师
            // 1、添加用户相关信息 获取用户id (老师)
            result = await ctx.model.Teacher.create({
                teacher_number: user.identity,
                teacher_name: user.name,
                teacher_telephone: user.phone,
            });
            userId = result.teacher_id;
        } else (user.role == 1); { // role==1学生
            result = await ctx.model.Student.create({
                student_number: user.identity,
                student_name: user.name,
                student_telephone: user.phone,
            });
            userId = result.student_id;
        }


        // 2、添加用户登录信息 
        // a、账号 
        await ctx.model.Login.create({
            login_name: user.name,
            login_password: user.password,
            login_type: user.role,
            user_id: userId
        })

        // b、电话2
        await ctx.model.Login.create({
            login_name: user.phone,
            login_password: user.pwd,
            login_type: user.role,
            user_id: userId
        })


        // // c、邮箱
        // await ctx.model.Login.create({
        //     login_name: user.email,
        //     login_password: user.pwd,
        //     login_type: user.role,
        //     user_id: userId
        // })


        if (result != null) {
            return {
                code: 200,
                msg: "注册成功"
            }
        } else {
            return {
                code: -1,
                msg: "注册失败"
            }
        }
        // return result.dataValues;
    }


    // 验证密码
    async verifyPassword(id, password) {
        const { ctx } = this;
        const result = await ctx.model.Login.findOne({
            where: {
                user_id: id
            }
        })
        //加密
        const md5Password = await this.getMd5Data(password)
        console.log(md5Password)
        if (result.login_password != md5Password) {
            return {
                code: -1,
                msg: "密码错误"
            }
        } else {
            return {
                code: 200,
                msg: "验证成功"
            }
        }
    }

    //查找用户
    async selectUser(user) {
        const { ctx } = this;

        if (result == null) {
            return false // 用户不存在
        }
        return result.dataValues;

    }


    // app修改密码
    async changePassword(id, oldPwd, newPwd) {
        const { ctx } = this;

        // 对原密码进行md5加密与数据库中密码比较
        //md5加密
        const md5oldPwd = await this.getMd5Data(oldPwd)
        //根据id查找用户
        const user = await ctx.model.Login.findOne({
            where: {
                user_id: id,
            },
        })
        if (user == null) {
            return {
                code: -1,
                msg: "用户不存在"
            }
        }
        // 比较原密码是否一致
        if (md5oldPwd != user.login_password) {
            return {
                code: -2,
                msg: "密码错误"
            }
        }
        // md5加密新密码
        const md5newPwd = await this.getMd5Data(newPwd)
        // 更新
        const result = await ctx.model.Login.update(
            {
                login_password: md5newPwd
            },
            {
                where: {
                    user_id: id
                }
            }
        )
        if (result != 0) {
            return {
                code: 200,
                msg: "修改成功"
            }
        } else {
            return {
                code: -3,
                msg: "修改失败"
            }
        }
    }


}

module.exports = LoginService;
