import request from '@/api/request'
import {setToken, getToken, removeToken} from '@/utils/auth';

const userMainAPI = {
    base_url: '/user/',

    getAllList: function () {
        return request({
            url: this.base_url + 'all',
            method: 'get'
        });
    },
    addUser: function (data) {
        return request({
            url: this.base_url + 'userInfo',
            method: 'post',
            params: data
        });
    },
    getUser: function (ID) {
        return request({
            url: this.base_url + 'userInfo',
            method: 'get',
            params: {
                userId: ID
            }
        });
    },
    // 根据获取用户信息
    getUserByToken: function () {
        return request({
            url: this.base_url + 'token',
            method: 'get'
        });
    },
    editUser: function (userData) {
        const data = {
            userName: userData.userName,
            id: userData.id,
            email: userData.email,
            phone: userData.phone,
            sex: userData.sex,
            status: userData.status
        }
        return request({
            url: this.base_url + 'userInfo',
            method: 'put',
            params: data
        });
    },
    resetPassword: function (ID) {
        return request({
            url: this.base_url + 'pwd',
            method: 'put',
            params: {
                id: ID
            }
        });
    },
    deleteUser: function (ID) {
        return request({
            url: this.base_url + 'userInfo',
            method: 'delete',
            params: {
                uid: ID
            }
        });
    }
}

export default userMainAPI
