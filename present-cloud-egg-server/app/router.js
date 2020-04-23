'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 配置路由
  router.get('/user', controller.home.getUserInfo)

  // 登录
  router.post('/login', controller.login.login)

  // 注册
  router.post('/register', controller.login.register)
};
