import request from '@/api/request'
import {setToken, getToken, removeToken} from '@/utils/auth';

const roleMainAPI = {

    // 获取所有角色
    getAllRole: function () {
        return request({
            url: 'selectRoleAll',
            method: 'get'
        });
    },
    // 根据role的ID查询对应的角色信息
    getById: function (id) {
        console.log(id);
        return request({
            url: 'selectRoleById',
            method: 'get',
            params: {
                roleId: id
            }
        });
    },
    // 增加角色
    addRole: function (data) {
        return request({
            url: 'insertRole',
            method: 'post',
            params: {
                name: data.role_name,
                type: data.role_type,
                detail: data.detail

            }
        });
    },
    // 修改角色
    editRole: function (roleData) {
        return request({
            url: 'updateRole',
            method: 'put',
            params: {
            name: roleData.role_name,
            id: roleData.roleId,
            detail: roleData.detail,
            type: roleData.role_type

            }
        });
    }, 
    // 删除角色
    remove: function (ID) {
        return request({
            url: 'deleteRoleById',
            method: 'delete',
            params: {
                id: ID
            }
        });
    }

   
}

export default roleMainAPI
