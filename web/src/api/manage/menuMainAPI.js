import request from '@/api/request'
import {setToken, getToken, removeToken} from '@/utils/auth';
import roleMainAPI from './roleMainAPI';

const menuMainAPI = {


    
    findAll: function () {
        return request({
            url: 'selectMenuAll',
            method: 'get',
            
        });
    },
    deletemenu: function (id) {
        // console.log('id:'+id);
        return request({
            url: 'deleteMenu',
            method: 'get',
            params: {
                id:id
            }
        });
    },
    
    addmenu: function (menuname,submenus) {
        // console.log('menuname:'+menuname);
        // console.log('submenus:'+submenus);
        return request({
            

            url: 'insertMenu',
            method: 'post',
            params: {
                menuname:menuname,
                submenus:submenus
            }
        });
    },
  
    addpage: function (buttons,menuname,supermenu) {
        // console.log('buttons:'+buttons);
    
        // console.log('menuname:'+menuname);
        // console.log('supermenu:'+supermenu);
        return request({
            url: 'insertPage',
            method: 'post',
            params: {
                buttons:buttons,
                menuname:menuname,
                supermenu:supermenu
            }
        });
    },
    addbutton: function (button,supermenu) {
        // console.log('button:'+button);
    
        // console.log('supermenu:'+supermenu);
        return request({
            url: 'insertButton',
            method: 'post',
            params: {
                button:button,
                supermenu:supermenu
            }
        });
    },
    
}

export default menuMainAPI
