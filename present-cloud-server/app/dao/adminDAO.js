var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var admainSqlMap = require('./adminSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    // 增insert
    insert: function (admin, callback) {
        pool.query(admainSqlMap.insert, 
            [admin.admin_id, admin.admin_number, admin.admin_name, admin.create_time, admin.creator, admin.update_time, admin.updater], 
            function (error, result) {
                if (error) throw error;
                callback(result);
        })
    },

    // 删delete
    deleteById: function (admin, callback) {
        pool.query(admainSqlMap.deleteById, 
            admin.admin_id, 
            function (error, result) {
                if (error) throw error;
                callback(result);
        })
    },

    // 改update 修改管理员姓名
    updateById: function (admin, callback) {
        pool.query(admainSqlMap.updateById, 
            [admin.admin_name, admin.admin_id],
            function (error, result) {
                if (error) throw error;
                callback(result);
        })
    },

    // 查select 查看所有
    select: function(admin, callback) {
        pool.query(admainSqlMap.select, 
            function (error, result) {
                if (error) throw error;
                callback(result);
            })
    }

};
