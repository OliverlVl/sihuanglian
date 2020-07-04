import request from '@/api/request'
import { setToken, getToken, removeToken } from '@/utils/auth';

const courageMainAPI = {
    getAllCourage: function (page) {
        console.log('page:'+page);
        return request({
            url: 'selectCourInfoByPage',
            method: 'get',
            params: {
                
                page: page
            }
        });
    },
}

export default courageMainAPI