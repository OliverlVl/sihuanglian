'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);

  // 配置路由
  router.get('/user', controller.home.getUserInfo)

  //----------------------------------------------------------web----------------------------------------------------------

  // ------------------------登入------------------------

  // 登录
  router.post('/login', controller.hello.login)
  router.post('/login/index', jwt, controller.hello.index)
  // router.get('/getMD5/:data', controller.hello.getMd5Data)

  // 注册
  router.post('/register', controller.hello.register)

  //修改密码
  // router.post('/updatePassword',controller.hello.updatePassword)

  // 忘记密码
  router.post('/resetPassword', controller.hello.resetPassword)



  // ------------------------数据字典------------------------

  // 获取所有字典详情信息
  router.get('/getAllDictList', controller.hello.selectDictionaryDetailAll)

  // 查询具体id字典详情信息
  router.get('/selectDictionaryDetailById', controller.hello.selectDictionaryDetailById)

  // 查询字典详情
  router.get('/selectDictionaryDetail', controller.hello.selectDictionaryDetail)

  // 根据id修改item_value
  router.post('/editDictItem', controller.hello.updateDictionaryDetail)

  // 根据code增加记录
  router.post('/addDict', controller.hello.insertDictionaryDetail)

  // 根据id删除记录
  router.delete('/deleteDictionaryDetail', controller.dictionaryDetail.deleteDictionaryDetail)


  // ------------------------系统参数------------------------

  // 查询系统参数
  router.get('/selcetSystemParameterAll', controller.hello.selcetSystemParameterAll)

  // 修改系统参数
  router.put('/updateSystemParameter', controller.hello.updateSystemParameter)


  // ------------------------菜单管理------------------------

  // 查看所有菜单
  router.get('/selectMenuAll', controller.hello.selectMenuAll)

  // 删除菜单
  router.get('/deleteMenu', controller.hello.deleteMenu)

  // 添加菜单
  router.post('/insertMenu', controller.hello.insertMenu)

  // 添加page
  router.post('/insertPage', controller.hello.insertPage)

  // 添加按钮
  router.post('/insertButton', controller.hello.insertButton)


  // ------------------------角色------------------------

  // 获取所有角色
  router.get('/selectRoleAll', controller.hello.selectRoleAll)

  // 根据id查询角色信息
  router.get('/selectRoleById', controller.hello.selectRoleById)

  // 添加角色
  router.post('/insertRole', controller.hello.insertRole)

  // 修改角色
  router.put('/updateRole', controller.hello.updateRole)

  // 根据id删除角色
  router.delete('/deleteRoleById', controller.hello.deleteRoleById)


  // ------------------------学生用户管理------------------------

  // 获取所有学生 #获取所有用户
  router.get('/getAllList', controller.hello.selectStudentAll)

  // 根据id查询学生信息 #获取用户
  router.get('/getUser', controller.hello.selectStudentById)

  // 修改学生信息 #编辑用户
  router.put('/editUser', controller.hello.updateStudent)

  // 根据id删除学生 #删除用户
  router.delete('/deleteUser', controller.hello.deleteStudentById)


  // ------------------------课程管理------------------------

  // 获取十条班课信息
  router.get('/selectCourInfoByPage', controller.hello.selectCourInfoByPage)




  //----------------------------------------------------------APP----------------------------------------------------------



  const url = '/app' // 加一个url前缀

  // ------------------------1.登录页面------------------------

  // 登录
  router.post(url + '/login', controller.appController.login)

  // ------------------------2.注册页面------------------------

  // 注册
  router.post(url + '/regist', controller.appController.register)

  // ------------------------3.忘记密码页面------------------------

  // 忘记密码
  router.post(url + '/resetPwd', controller.appController.appResetPassword)

  // ------------------------4.学生主页页面------------------------

  // 获取课程表
  router.get(url + '/courseList', controller.appController.selcetCourseList)

  // 获取课程表信息
  router.get(url + '/getCourseInfo', controller.appController.selcetCourseInfoByCourseId)

  // 加入班课
  router.post(url + '/addCourse', controller.appController.addCourse)

  // 退出班课
  router.post(url + '/quit', controller.appController.quitCourse)

  // ------------------------5.学生课程信息页面------------------------

  // a)获取班课信息接口
  // router.get(url+'/getCourseInfo', controller.appController.getCourseInfo)
  // b)学生参与签到接口
  router.post(url + '/signIn', controller.appController.signIn)


  // ------------------------6.学生签到详情页面------------------------

  // 所有的签到记录
  router.get(url + '/studentSignInInfo', controller.appController.studentSignInInfo)

  // ------------------------7.更改手机号码页面------------------------

  // 验证密码
  router.post(url + '/verifyPwd', controller.appController.verifyPassword)

  // 更改手机号
  router.post(url + '/changePhone', controller.appController.updatePhone)

  // ------------------------8.修改密码页面------------------------


  // 修改密码
  router.post(url + '/changePwd', controller.appController.changePassword)

  // ------------------------9.用户反馈页面------------------------

  router.post(url + '/feedback', controller.appController.feedback)

  //------------------------10.教师主页页面------------------------

  //a)课程表接口：
  router.get(url + '/courseList', controller.appController.courseList)

  //------------------------11.创建班课页面------------------------

  // 创建班课接口：
  router.post(url + '/createCourse', controller.appController.createCourse)

  // ------------------------12.教师课程信息页面------------------------

  // 获取班课信息(同学生功能)

  // 发起签到
  router.post(url + '/launchSignIn', controller.appController.launchSignIn)

  // 签到详情
  // router.get(url + '/teachrerSignInInfo', controller.appController.teachrerSignInInfo)

  // 结束签到
  router.get(url + '/signInEnd', controller.appController.signInEnd)





  //------------------------13.签到记录页面------------------------
  //a)签到记录接口
  router.get(url + '/signInRecord', controller.appController.signInRecord)


  //------------------------14.单次学生签到详情页面------------------------
  //a)签到记录接口
  router.get(url + '/singleSignInRecord', controller.appController.singleSignInRecord)




  // 完善老师信息
  router.post('/updateTeacherInfo', controller.teacher.updateTeacherInfo)

  // 完善学生信息
  router.post('/updateStudentInfo', controller.student.updateStudentInfo)

  // 查询班课(学生通过班课编号查) 地址加问号传入course_number
  router.get('/selectCourse', controller.course.selectCourse)

  // 学生加入班课 地址加问号传入course_number
  router.get('/addCourse', controller.selectCourse.addCourse)



};
