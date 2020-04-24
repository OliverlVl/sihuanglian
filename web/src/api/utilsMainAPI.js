import request from '@/api/request'
import {setToken, getToken, removeToken} from '@/utils/auth';

const utilsMainAPI = {
    // 获取验证码
    getVercode: function (email, type) {
        return request({
            url: '/register/email',
            method: 'get',
            params: {
                receiver: email,
                type: type
            }
        });
    }
}

export default utilsMainAPI
