import axios from 'axios'
import {message, constant} from '../utils';
import {setToken, getToken, removeToken} from '../utils/auth';
import store from '../store/index'

const service = axios.create({
    baseURL: 'http://59.77.134.232/star/api', 
    // process.env.VUE_APP_BASE_API, // api的base_url
    timeout: 5000
})

const NOT_LOGIN = constant.ERROR_CODE_NOT_LOGIN;
const NOT_PERMISSION = constant.ERROR_CODE_NOT_PERMISSION;

service.interceptors.request.use(config => {
    config.headers[constant.REQUEST_HEADER_TOKEN_KEY] = getToken();
    return config;
}, error => {
    console.log(error);
    Promise.reject(error);
});

service.interceptors.response.use(
    response => {
        const res = response.data;

        return new Promise((resolve, reject) => {
            if (res !== null && res.status === 0) {
                resolve(res);
            } else {
                message.showError(res.msg);
                if (res.status === '99') {
                    store.dispatch('Locked');
                }
                reject(res);
            }
        })
    },
    // response => response,
    error => {
        console.log(error);
    
        if (constant.ERROR_CODE_NETWORK_ERROR === error.code) {
            message.showError('连接错误!');
            return;
            // return Promise.reject();
        }
        let {data} = error.response;
        if (data !== undefined || data.msg !== undefined) {
            message.showError(data.msg);
        } else {
            message.showError(error.message);
            
        }
    }
);

export default service
