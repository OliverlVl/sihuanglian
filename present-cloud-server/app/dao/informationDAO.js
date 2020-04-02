var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var informationSqlMap = require('./informationSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: function (information, callback) {
        pool.query(informationSqlMap.insert, [information.information_name, information.information_context, information.admin_id, information.creat_time, information.creator], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: function (information, callback) {
        pool.query(informationSqlMap.deleteById, information.information_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改发布信息
    updateById: function (information, callback) {
        pool.query(informationSqlMap.updateById, [information.information_name, information.information_context, information.admin_id, information.update_time, information.updater, information.information_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 查select ////////////////////////////

    // 搜索所有管理员发布信息
    selectAll: function (information, callback) {
        pool.query(informationSqlMap.selectAll, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },



};