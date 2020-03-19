import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const s_course = resolve => require(['../components/page/S_course.vue'], resolve)

export default new Router({
  mode: 'history',  //把Router的mode修改为history模式,VueRouter默认的模式为HASH模式
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      // 课程管理页面
      path: '/s_course',
      component: s_course,
      name: 's_course',
      meta: {
        title: '课程管理',
        requireAuth: true
      }
    }
  ]
})
