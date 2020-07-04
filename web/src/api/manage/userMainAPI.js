import request from '@/api/request'
import {setToken, getToken, removeToken} from '@/utils/auth';

const userMainAPI = {
    

    getAllList: function () {
        return request({
            url: 'getAllList',
            method: 'get'
        });
    },
    
    getUser: function (ID) {
        return request({
            url: 'getUser',
            method: 'get',
            params: {
                userId: ID
            }
        });
    },
    
    editUser: function (userData) {
        return request({
            url: 'editUser',
            method: 'put',
            params: {
                id: userData.id,
                userName: userData.userName,
                account: userData.account,
                email: userData.email,
                phone: userData.phone,
                sex: userData.sex,
                
            }
        });
    },
    
    deleteUser: function (ID) {
        return request({
            url: 'deleteUser',
            method: 'delete',
            params: {
                uid: ID
            }
        });
    }
}

export default userMainAPI
