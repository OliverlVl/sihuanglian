var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var studentSqlMap = require('./studentSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    // 增insert
    insert: function (student, callback) {
        pool.query(studentSqlMap.insert, [], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    }
    // 删delete


    // 改update

    // 查select


};