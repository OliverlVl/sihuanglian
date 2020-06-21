import request from '@/api/request'
import {setToken, getToken, removeToken} from '@/utils/auth';

const roleMainAPI = {
    base_url: '/role/',
    // 获取所有角色
    getAllRole: function () {
        return request({
            url: this.base_url + 'all',
            method: 'get'
        });
    },
    // 根据role的ID查询对应的角色信息
    getById: function (id) {
        console.log(id);
        return request({
            url: this.base_url + 'roleInfo',
            method: 'get',
            params: {
                roleId: id
            }
        });
    },
    // 增加角色
    addRole: function (data) {
        return request({
            url: this.base_url + 'roleInfo',
            method: 'post',
            params: data
        });
    },
    // 修改角色
    editRole: function (roleData) {
        const data = {
            roleName: roleData.roleName,
            roleId: roleData.roleId,
            detail: roleData.detail,
            userType: roleData.userType
        }
        return request({
            url: this.base_url + 'roleInfo',
            method: 'put',
            params: data
        });
    }, 
    // 删除角色
    remove: function (ID) {
        return request({
            url: this.base_url + 'roleInfo',
            method: 'delete',
            params: {
                id: ID
            }
        });
    }

   
}

export default roleMainAPI
