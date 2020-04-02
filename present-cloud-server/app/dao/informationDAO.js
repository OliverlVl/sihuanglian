var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var informationSqlMap = require('./informationSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    // 增insert
    insert: function (information, callback) {
        pool.query(informationSqlMap.insert, [information.information_name, information.information_context, information.admin_id, information.creat_time, information.creator], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    // 删delete
    deleteById: function (information, callback) {
        pool.query(informationSqlMap.deleteById, information.information_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 改update
    updateById: function (information, callback) {
        pool.query(informationSqlMap.updateById, [information.information_name, information.information_context, information.admin_id, information.update_time, information.updater, information.information_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 查select
    selectAll: function (information, callback) {
        pool.query(informationSqlMap.selectAll, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },



};