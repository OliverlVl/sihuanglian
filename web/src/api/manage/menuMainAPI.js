import request from '@/api/request'
import {setToken, getToken, removeToken} from '@/utils/auth';
import roleMainAPI from './roleMainAPI';

const menuMainAPI = {
    base_url: '/menu/',

    
    findAll: function () {
        return request({
            url: this.base_url + 'findAll',
            method: 'get',
            
        });
    },
    deletemenu: function (delSel) {
        return request({
            url: this.base_url + 'deletemenu',
            method: 'post',
            params: {
                delSel: delSel
            }
        });
    },
    
    addmenu: function (Menu) {
        return request({
            url: this.base_url + 'addmenu',
            method: 'post',
            params: {
                Menu: Menu
            }
        });
    },
  
    addpage: function (Page1) {
        return request({
            url: this.base_url + 'addpage',
            method: 'post',
            params: {
                Page: Page1
            }
        });
    },
    addbutton: function (button1) {
        return request({
            url: this.base_url + 'addbutton',
            method: 'post',
            params: {
                button: button1
            }
        });
    },
    
}

export default menuMainAPI
