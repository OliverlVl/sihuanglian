import request from '@/api/request'
import {setToken, getToken, removeToken} from '@/utils/auth';

const dictionaryMainAPI = {
    base_url: '/dict/',
    getAllDictList: function () {
        return request({
            url: this.base_url + 'data',
            method: 'get'
        });
    },
    editDictItem: function (data) {
        return request({
            url: this.base_url + 'data',
            method: 'put',
            params: {
                id: data.id,
                // DataTypeKey: data.dataTypeKey,
                DataKey: data.dataKey,
                DataValue: data.dataValue,
                DataDesc: data.dataDesc
            }
        });
    },
    getDictItem: function (ID) {
        return request({
            url: this.base_url + 'dicId',
            method: 'get',
            params: {
                dicID: ID
            }
        });
    },
    deleteDict: function (ID) {
        return request({
            url: this.base_url + 'data',
            method: 'delete',
            params: {
                id: ID
            }
        });
    },
    addDict: function (data) {
        return request({
            url: this.base_url + 'data',
            method: 'post',
            params: {
                DataKey: data.dataKey,
                DataValue: data.dataValue,
                DataDesc: data.dataDesc
            }
        });
    },
  
    getDataInfo: function () {
        return request({
            url: this.base_url + 'dataContent',
            method: 'get',
            
        });
    },
    // 根据ID修改字典内容
    editDataItem: function (data) {
        return request({
            url: this.base_url + 'dataContent',
            method: 'put',
            params: {
                exp:data.exp,
                distance:data.distane
            }
        });
    },
    

    // 根据字典内容ID返回数据
    getDataItem: function () {
        return request({
            url: this.base_url + 'dicCnt/dicCntId',
            method: 'get',
            params: {
                dicCntID: ID
            }
        });
    },
    // 根据字典Key，返回字典内容的key和value
    getDataItemByType: function (key) {
        return request({
            url: this.base_url + 'dicCnt/dicKey',
            method: 'get',
            params: {
                dicKey: key
            }
        });
    }
    
}

export default dictionaryMainAPI
