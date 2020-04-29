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
                // DataTypeKey: data.dataTypeKey,
                DataKey: data.dataKey,
                DataValue: data.dataValue,
                DataDesc: data.dataDesc
            }
        });
    },
    getSelectOption: function () {
        return request({
            url: this.base_url + 'dicIdValue',
            method: 'get'
        });
    },
    // 根据字典ID,获取字典下的所有内容
    getDataInfo: function (ID) {
        return request({
            url: this.base_url + 'dataContent',
            method: 'get',
            params: {
                dicId: ID
            }
        });
    },
    // 根据字典内容ID返回数据
    getDataItem: function (ID) {
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
    },
    // 根据ID修改字典内容
    editDataItem: function (data) {
        return request({
            url: this.base_url + 'dataContent',
            method: 'put',
            params: {
                id: data.id,
                dicId: data.dictionary.id,
                contentValue: data.contentValue,
                contentKey: data.contentKey,
                status: data.status,
                describe: data.describe,
                sequence: data.sequence
            }
        });
    },
    // 添加字典内容
    addDataItem: function (data, id) {
        return request({
            url: this.base_url + 'dataContent',
            method: 'post',
            params: {
                dicId: id,
                contentValue: data.contentValue,
                contentKey: data.contentKey,
                status: data.status,
                describe: data.describe,
                sequence: data.sequence
            }
        });
    },
    delDataItem: function (id) {
        return request({
            url: this.base_url + 'dataContent',
            method: 'delete',
            params: {
                id: id
            }
        });
    }
}

export default dictionaryMainAPI
