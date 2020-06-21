import request from '@/api/request'
import { setToken, getToken, removeToken } from '@/utils/auth';

const courageMainAPI = {
    base_url: '/courage/',
    getAllCourage: function (data, page) {
        return request({
            url: this.base_url + 'data',
            method: 'get',
            params: {
                data: data,
                page: page
            }
        });
    },
}

export default courageMainAPI