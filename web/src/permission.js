import router from './router/index.js'
import store from './store'
import {message} from './utils'
import {getToken, removeToken} from '@/utils/auth' // getToken from cookie
import userMainAPI from '@/api/manage/userMainAPI'

const whiteList = ['/login']// 不需要权限的路由,name

function hasPermission (menus, route) {
    console.log(route.name, menus[route.name]);
    if (route.path === '*' || menus[route.name] !== undefined ||
        (route.meta !== undefined && route.meta.authFilter === false)) {
        return true;
    }
    return false;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap, menus) {
    const accessedRouters = asyncRouterMap.filter(route => {
        let flag = false;
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, menus);
            if (route.children !== undefined && route.children.length > 0) {
                flag = true;
            }
        }
        return flag || hasPermission(menus, route);
    });
    return accessedRouters
}

// 路由进入前做的事
router.beforeEach((to, from, next) => {
    let query = to.query;
    // 判断是否有获取到token
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/home'})
        } else {
            if (store.getters.userId === undefined) {
                userMainAPI.getUserByToken().then(res => {
                    // 用户token存在，已登录
                    if (res.status === 0) {
                        store.dispatch('updateUserInfo', res.data, getToken());
                        let {menuList = []} = res.data;
                        let menuMap = {};
                        for (let tmp of menuList) {
                            menuMap[tmp.url] = tmp.id;
                        }
                        // debugger
                        let accessedRouters = filterAsyncRouter(routes, menuMap) // 路由过滤
                        router.addRoutes(accessedRouters); // 动态添加可访问路由表
                        store.dispatch('updateRoutes', accessedRouters).then(() => {
                            next({...to, replace: true})
                        });
                    } else {
                        // 用户token不存在
                        next({path: '/login'})
                    }
                }).catch((e) => {
                    console.error(e);
                    removeToken();
                    next({
                        path: '/login', query: query
                    });
                })
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // NProgress.done();
            next()
        } else {
            if (query.routeName === undefined) {
                query.routeName = to.name;
            }
            next({
                path: '/login', query: query
            });
        }
    }
})

// 路由进入后做的事
router.afterEach(() => {
    // message.endLoading();
})
