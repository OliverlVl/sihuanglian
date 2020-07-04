import Vue from 'vue'
import Router from 'vue-router'

import Container from '../components/page/Container.vue'

Vue.use(Router);
const defaultRoute = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/page/loginManage/login.vue'),
    hidden: false,
    meta: { title: '签到Star', authFilter: false }
  }
]
export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/page/loginManage/login.vue'),
    hidden: false,
    meta: { title: '签到Star', authFilter: false }
  },
  {
    path: '/',
    component: Container,
    redirect: 'home',
    hidden: false,
    children: [{
      path: '/home',
      component: () => import('../components/page/HomeIndex.vue'),
      name: 'home',
      hidden: false,
      meta: { title: '首页', icon: 'all', noCache: true, authFilter: false }
    }, {
      path: '/errPage',
      component: Container,
      hidden: false,
      meta: { title: '异常页', icon: 'rfq', noCache: true },
      children: [
        {
          path: '/err403',
          component: () => import('../components/page/err/403.vue'),
          name: 'err403',
          hidden: false,
          meta: {
            title: '403',
            requireAuth: true
          }
        },
        {
          path: '/err404',
          component: () => import('../components/page/err/404.vue'),
          name: 'err404',
          hidden: false,
          meta: {
            title: '404',
            requireAuth: true
          }
        },
        {
          path: '/err500',
          component: () => import('../components/page/err/500.vue'),
          name: 'err500',
          hidden: false,
          meta: {
            title: '500',
            requireAuth: true
          }
        }]
    },
    {
      path: '/dict',
      component: () => import('../components/page/dataDictionary/DictionaryContainer.vue'),
      name: 'dataDictionary',
      hidden: false,
      meta: {
        title: '数据字典',
        requireAuth: true,
        noCache: true
      },
    },
    {
      path: '/user',
      component: () => import('../components/page/userManage/UserIndex.vue'),
      name: 'userManage',
      hidden: false,
      meta: {
        title: '用户管理', noCache: true, icon: 'account'
      },
    },
    {
      path: '/role',
      component: () => import('../components/page/roleManage/RoleMainIndex.vue'),
      name: 'rolerManage',
      hidden: false,
      meta: { title: '角色管理', noCache: true, icon: 'edit' },
    },
    {
      path: '/menu',
      component: () => import('../components/page/menuManage/MenuIndex.vue'),
      name: 'menuManage',
      hidden: false,
      meta: { title: '菜单管理', noCache: true },
    },
    {
      path: '/organ',
      component: () => import('../components/page/organManage.vue'),
      name: 'organManage',
      hidden: false,
      meta: { title: '组织管理', noCache: true },
    },
     {
      path: '/courage',
      component: () => import('../components/page/courageManage/CourageIndex.vue'),
      name: 'courageManage',
      hidden: false,
      meta: { title: '课程查看', noCache: true },
    },
    ]
  },

];

export default new Router({
  routes: routes,
})

