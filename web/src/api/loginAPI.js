import request from '@/api/request'

const userLoginAPI = {
    base_url: 'register/',
    // 登录
    login: function (account, password) {
        const data = {
            account,
            password
        }
        return request({
            url: this.base_url + 'signup',
            method: 'post',
            params: data
        })
    },
    // 登出
    logout: function () {
        return request({
            url: this.base_url + 'logOut',
            method: 'get'
        })
    },
    // 注册
    register: function (data) {
        return request({
            url: this.base_url + 'register',
            method: 'POST',
            params: data
        })
    },
    // 忘记密码
    resetPassword: function (data) {
        return request({
            url: this.base_url + 'resetPassword',
            method: 'POST',
            params: data
        })
    }
}

export default userLoginAPI
