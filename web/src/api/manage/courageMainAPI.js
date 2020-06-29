import request from '@/api/request'
import { setToken, getToken, removeToken } from '@/utils/auth';

const courageMainAPI = {
    base_url: '/courage/',
    getAllCourage: function (page) {
        return request({
            url: this.base_url + 'data',
            method: 'get',
            params: {
                
                page: page
            }
        });
    },
}

export default courageMainAPI