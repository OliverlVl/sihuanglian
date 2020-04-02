var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var admainSqlMap = require('./adminSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: function (admin, callback) {
        pool.query(admainSqlMap.insert, 
            [admin.admin_number, admin.admin_name, admin.create_time, admin.creator, admin.update_time, admin.updater], 
            function (error, result) {
                if (error) throw error;
                callback(result);
        })
    },

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: function (admin, callback) {
        pool.query(admainSqlMap.deleteById, 
            admin.admin_id, 
            function (error, result) {
                if (error) throw error;
                callback(result);
        })
    },

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改管理员姓名
    updateById: function (admin, callback) {
        pool.query(admainSqlMap.updateById, 
            [admin.admin_name, admin.admin_id],
            function (error, result) {
                if (error) throw error;
                callback(result);
        })
    },

    //////////////////////////// 查select ////////////////////////////

    // 查看所有管理员信息
    selectAll: function(admin, callback) {
        pool.query(admainSqlMap.selectAll, 
            function (error, result) {
                if (error) throw error;
                callback(result);
            })
    }

};
