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

  // 完善老师信息
  router.post('/updateTeacherInfo', controller.teacher.updateTeacherInfo)

  // 完善学生信息
  router.post('/updateStudentInfo', controller.student.updateStudentInfo)
};
