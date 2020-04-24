import request from '@/api/request'
import {setToken, getToken, removeToken} from '@/utils/auth';
import roleMainAPI from './roleMainAPI';

const menuMainAPI = {
    base_url: '/menu/',

    // 菜单树
    getMenuTree: function () {
        return request({
            url: this.base_url + 'menuTree',
            method: 'get'
        });
    },
    // 根据菜单代码获取菜单信息
    getMenuByKey: function (id) {
        return request({
            url: this.base_url + 'MenuInfo',
            method: 'get',
            params: {
                menuValue: id
            }
        });
    },
    // 根据菜单代码获取菜单所分配的用户列表
    menuRoleList: function (id) {
        return request({
            url: this.base_url + 'userTypeList',
            method: 'get',
            params: {
                id: id
            }
        });
    },
    getRoleMenus: function (roleId) {
        return request({
            url: this.base_url + 'menu/list',
            method: 'get',
            params: {
                id: roleId
            }
        });
    },
    allMenu: function () {
        return request({
            url: this.base_url + 'MenuList/All',
            method: 'POST'
        });
    },
    // 获取所有的根菜单-用于选择上级菜单中，父级菜单的选择项
    getSelectMenu: function () {
        return request({
            url: this.base_url + 'allRootMenu',
            method: 'get'
        });
    },
    save: function (data) {
        return request({
            url: this.base_url + 'roleMenu',
            method: 'POST',
            params: data
        });
    },
    update: function (data) {
        return request({
            url: this.base_url + 'menuInfo',
            method: 'PUT',
            params: data
        });
    },
    remove: function (id) {
        return request({
            url: this.base_url + 'roleMenu',
            method: 'delete',
            params: {
                id: id
            }
        });
    },
    updateRoleMenu: function (roleId, menuList) {
        return request({
            url: this.base_url + '/MenuRole',
            method: 'POST',
            params: {
                menuValue: menuList + '',
                roleID: roleId
            }
        });
    },
    //  获取用户侧边栏菜单
    getUserMenu: function () {
        return request({
            url: this.base_url + '/sider',
            method: 'get'
        });
    }
}

export default menuMainAPI
