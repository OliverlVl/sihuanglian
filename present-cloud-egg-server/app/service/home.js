'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
//   async index() {
    
//   }

  async getUserInfo() {
    // this.ctx.model 调用model .User (对象,根据model文件名(首字母大写))
    // const user = await this.ctx.model.User.findAll()
    const user = await this.ctx.model.SignIn.findAll()
    return user
  }
}

module.exports = HomeService;
