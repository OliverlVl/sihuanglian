import request from '@/api/request'

const userLoginAPI = {
    
    // 登录
    login: function (account, password) {
        // console.log(account)
        return request({
            url: 'login',
            method: 'post',
            params:{
                account: account, 
                password: password


            } 
        })
    },
    // 登出
    logout: function () {
        return request({
            url: 'logOut',
            method: 'get'
        })
    },
    // 注册
    register: function (data) {
        console.log(data)
        return request({
            url: 'register',
            method: 'POST',
            params: {
                account:data.account,
                userName:data.userName,
                pwd:data.pwd,
                phone:data.phone,
                email:data.email,


            }
        })
    },
    // 忘记密码
    resetPassword: function (data) {
        return request({
            url: 'resetPassword',
            method: 'POST',
            params: {
                account:data.account,
                password:data.password,
                repassword:data.repassword
            }
        })
    }
}

export default userLoginAPI
