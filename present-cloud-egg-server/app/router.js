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

  // 查询班课(学生通过班课编号查) 地址加问号传入course_number
  router.get('/selectCourse', controller.course.selectCourse)

  // 学生加入班课 地址加问号传入course_number
  router.get('/addCourse', controller.selectCourse.addCourse)

  // 学生加入班课 地址加问号传入course_number
  router.get('/selectDictionaryDetail', controller.dictionaryDetail.selectDictionaryDetail)

  // 完善学生信息
  router.post('/updateDictionaryDetail', controller.dictionaryDetail.updateDictionaryDetail)

  // 完善学生信息
  router.post('/insertDictionaryDetail', controller.dictionaryDetail.insertDictionaryDetail)

  // 学生加入班课 地址加问号传入course_number
  router.get('/deleteDictionaryDetail', controller.dictionaryDetail.deleteDictionaryDetail)
};
