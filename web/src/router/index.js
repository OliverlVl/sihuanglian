import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)


const table = resolve => require(['../components/page/BaseTable.vue'], resolve)
const login = resolve => require(['../components/page/login.vue'], resolve)
const forget = resolve => require(['../components/page/ForgetForm.vue'], resolve)
const err403 = resolve => require(['../components/page/403.vue'], resolve)
const err404 = resolve => require(['../components/page/404.vue'], resolve)
const err500 = resolve => require(['../components/page/500.vue'], resolve)
const list = resolve => require(['../components/page/List.vue'], resolve)
const dict = resolve => require(['../components/page/dataDictionary/DictionaryContainer.vue'], resolve)


export default new Router({
  mode: 'history',  //把Router的mode修改为history模式,VueRouter默认的模式为HASH模式
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: '/table',
      component: table,
      name: 'table',
      meta: {
        title: '基础表格',
        requireAuth: true
      }
    },
    {
      path: '/login',
      component: login,
      name: 'login',
      meta: {
        title: '到云',
        requireAuth: true
      }
    },
    {
      path: '/forget',
      component: forget,
      name: 'forget',
      meta: {
        title: '忘记密码',
        requireAuth: true
      }
    },
    {
      path: '/err403',
      component: err403,
      name: 'err403',
      meta: {
        title: '403',
        requireAuth: true
      }
    },
    {
      path: '/err404',
      component: err404,
      name: 'err404',
      meta: {
        title: '404',
        requireAuth: true
      }
    },
    {
      path: '/err500',
      component: err500,
      name: 'err500',
      meta: {
        title: '500',
        requireAuth: true
      }
    },
    {
      // 课程管理页面
      path: '/list',
      component: list,
      name: 'list',
      meta: {
        title: '课程列表页',
        requireAuth: true
      }
    },
    {
      path: '/dict',
      component: dict,
      name: 'dataDictionary',
      hidden: false,
      meta: { title: '数据字典', 
        requireAuth: true,
      noCache: true 
      },
    }

  ]
})
