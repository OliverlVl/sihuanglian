'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
//   async index() {
    
//   }

  async getUserInfo() {
    // this.ctx.model 调用model .User (对象驼峰式命名)
    const user = await this.ctx.model.User.findAll()
    return user
  }
}

module.exports = HomeService;
