import request from '@/api/request'
import { setToken, getToken, removeToken } from '@/utils/auth';

const dictionaryMainAPI = {

    getAllDictList: function () {
        return request({
            url: 'getAllDictList',
            method: 'get'
        });
    },
    editDictItem: function (data) {
        return request({
            url: 'editDictItem',
            method: 'put',
            params: {
                id: data.detail_id,
                
                dataValue: data.item_value,
                
            }
        });
    },
    selectDictionaryDetailById: function (detail_id) {
        return request({
            url: 'selectDictionaryDetailById',
            method: 'get',
            params: {
                detail_id: detail_id
            }
        });
    },
    deleteDictionaryDetail: function (detail_id) {
        return request({
            url: 'deleteDictionaryDetail',
            method: 'delete',
            params: {
                detail_id: detail_id
            }
        });
    },
    addDict: function (data) {
        return request({
            url: 'addDict',
            method: 'post',
            params: {
                item_key: data.item_key,
                item_value: data.item_value,
                DataDesc: data.dataDesc
            }
        });
    },
    // 根据字典Key，返回字典内容的key和value
    selectDictionaryDetail: function (key) {
        return request({
            url: 'selectDictionaryDetail',
            method: 'get',
            params: {
                dicKey: key
            }
        });
    },
    selcetSystemParameterAll: function () {
        return request({
            url: 'selcetSystemParameterAll',
            method: 'get',

        });
    },
    // 根据ID修改字典内容
    updateSystemParameter: function (data) {
        return request({
            url: 'updateSystemParameter',
            method: 'put',
            params: {
                exp: data.exp,
                distance: data.distance
            }
        });
    },


    // 根据字典内容ID返回数据
    // getDataItem: function () {
    //     return request({
    //         url: this.base_url + 'dicCnt/dicCntId',
    //         method: 'get',
    //         params: {
    //             dicCntID: ID
    //         }
    //     });
    // }


}

export default dictionaryMainAPI
