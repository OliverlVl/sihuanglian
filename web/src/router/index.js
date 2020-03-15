import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
/* eslint-disable */
Vue.use(Router)
const baseList = resolve => require(['../components/baseList.vue'], resolve)
const table = resolve => require(['../components/BaseTable.vue'], resolve)
const form = resolve => require(['../components/BaseForm.vue'], resolve)


export default new Router({
  mode: 'history',  //把Router的mode修改为history模式,VueRouter默认的模式为HASH模式
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/baseList',
      name: 'baseList',
      component: baseList
    },
    {
      path: '/form',
      component: form,
      name: 'form',

    },
    {
      path: '/table',
      component: table,
      name: 'table',

    }
  ]
})
