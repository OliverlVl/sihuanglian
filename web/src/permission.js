import router from './router/index.js'
import store from './store'
import { message } from './utils'
import { getToken, removeToken } from '@/utils/auth' // getToken from cookie
import userMainAPI from '@/api/manage/userMainAPI'

const whiteList = ['/login']// 不需要权限的路由,name



// 路由进入前做的事
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        // console.log('login')
        next();
    } else {
        var token = localStorage.getItem('token')
        if (token == null) {
            next({path: '/login'})
        }else{
            console.log('跳转')
            next()
        }
    }})



    // 路由进入后做的事
    router.afterEach(() => {
        // message.endLoading();
    })
