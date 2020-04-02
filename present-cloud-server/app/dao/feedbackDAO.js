var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var feedbackSqlMap = require('./feedbackSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: function (feedback, callback) {
        pool.query(feedbackSqlMap.insert, [feedback.user_id, feedback.role, feedback.content], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: function (feedback, callback) {
        pool.query(feedbackSqlMap.deleteById, feedback.feedback_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 查select ////////////////////////////

    // 搜索所有反馈信息
    selectAll: function (feedback, callback) {
        pool.query(feedbackSqlMap.selectAll, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },


};