var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var loginiSqlMap = require('./loginiSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    // 增insert
    insert: function (login, callback) {
        pool.query(loginSqlMap.insert, [login.login_name, login.login_password, login.login_type, login.user_id,], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    // 删delete
    deleteById: function (login, callback) {
        pool.query(loginSqlMap.deleteById, login.login_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 改update
    updateById: function (login, callback) {
        pool.query(loginSqlMap.updateById, [login.login_name, login.password, login.login_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 查select
    selectByUserId: function (login, callback) {
        pool.query(loginSqlMap.selectByCourseId, login.user_id, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },



};