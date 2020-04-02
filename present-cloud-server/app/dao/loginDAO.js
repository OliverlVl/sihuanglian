var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var loginiSqlMap = require('./loginiSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: function (login, callback) {
        pool.query(loginSqlMap.insert, [login.login_name, login.login_password, login.login_type, login.user_id], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: function (login, callback) {
        pool.query(loginSqlMap.deleteById, login.login_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改登入信息
    updateById: function (login, callback) {
        pool.query(loginSqlMap.updateById, [login.login_name, login.password, login.login_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 查select ////////////////////////////

    // 根据用户id搜索登入信息
    selectByUserId: function (login, callback) {
        pool.query(loginSqlMap.selectByUserId, login.user_id, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },



};