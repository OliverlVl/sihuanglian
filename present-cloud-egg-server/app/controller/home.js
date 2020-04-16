'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = 'hi, egg';
  }
  async getUserInfo() {
    // 调用service中方法 home文件名 getUserInfo 文件中方法
    const users = await this.service.home.getUserInfo()
    console.log(JSON.stringify(users))
    this.ctx.body = users 
    
    // 接口
    // await this.ctx.render('user', { // 路由
    //   users: users // 返回数据 前端{{}}, {% %}使用
    // })
  }
}

module.exports = HomeController;
