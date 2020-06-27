'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);

  // 配置路由
  router.get('/user', controller.home.getUserInfo)


  // ------------------------登入------------------------

  // 登录
  router.post('/login', controller.hello.login)
  router.post('/login/index', jwt, controller.hello.index)
  // router.get('/getMD5/:data', controller.hello.getMd5Data)

  // 注册
  router.post('/register', controller.hello.register)

  //修改密码
  // router.post('/updatePassword',controller.hello.updatePassword)

  // ------------------------数据字典------------------------

  // 查询字典 详情
  router.get('/selectDictionaryDetail', controller.hello.selectDictionaryDetail)

  // 根据id修改item_value
  router.post('/updateDictionaryDetail', controller.dictionaryDetail.updateDictionaryDetail)

  // 根据code增加记录
  router.post('/insertDictionaryDetail', controller.dictionaryDetail.insertDictionaryDetail)

  // 根据id删除记录
  router.get('/deleteDictionaryDetail', controller.dictionaryDetail.deleteDictionaryDetail)


  // ------------------------系统参数------------------------

  // 查询系统参数
  router.get('/selcetSystemParameterAll', controller.hello.selcetSystemParameterAll)


  // ------------------------菜单管理------------------------

  // 查看所有菜单
  router.get('/selectMenuAll', controller.hello.selectMenuAll)
  

  // 添加page
  router.post('/insertPage', controller.hello.insertPage)

  // 添加按钮
  router.post('/insertButton', controller.hello.insertButton)

  // 删除菜单
  router.get('/deleteMenu', controller.hello.deleteMenu)

  // 添加菜单
  router.post('/insertMenu', controller.hello.insertMenu)

 


  // ------------------------角色------------------------

  // 获取所有角色
  router.get('/selectRoleAll',controller.hello.selectRoleAll)

  // 根据id查询角色信息
  router.get('/selectRoleById',controller.hello.selectRoleById)

  // 添加角色
  router.post('/insertRole',controller.hello.insertRole)

  // 修改角色
  router.put('/updateRole',controller.hello.updateRole)

  // 根据id删除角色
  router.delete('/deleteRoleById',controller.hello.deleteRoleById)





    // 完善老师信息
    router.post('/updateTeacherInfo', controller.teacher.updateTeacherInfo)

    // 完善学生信息
    router.post('/updateStudentInfo', controller.student.updateStudentInfo)
  
    // 查询班课(学生通过班课编号查) 地址加问号传入course_number
    router.get('/selectCourse', controller.course.selectCourse)
  
    // 学生加入班课 地址加问号传入course_number
    router.get('/addCourse', controller.selectCourse.addCourse)

  

};
