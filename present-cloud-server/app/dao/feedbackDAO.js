var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var feedbackSqlMap = require('./feedbackSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    // 增insert
    insert: function (feedback, callback) {
        pool.query(feedbackSqlMap.insert, [feedback.user_id, feedback.role, feedback.content], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    // 删delete
    deleteById: function (feedback, callback) {
        pool.query(feedbackSqlMap.deleteById, feedback.feedback_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 查select
    selectAll: function (feedback, callback) {
        pool.query(feedbackSqlMap.selectAll, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },


};