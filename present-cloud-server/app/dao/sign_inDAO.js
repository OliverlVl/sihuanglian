var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var sign_inSqlMap = require('./sign_inSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    // 增insert
    insert: function (sign_in, callback) {
        pool.query(sign_inSqlMap.insert, [sign_in.course_id, sign_in.teacher_id, sign_in.sign_teacher_time], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    // 删delete
    deleteById: function (sign_in, callback) {
        pool.query(sign_inSqlMap.deleteById, sign_in.sign_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 改update
    updateById: function (sign_in, callback) {
        pool.query(sign_inSqlMap.updateById, [sign_in.student_id, sign_in.student_place, sign_in.sign_student_time, sign_in.sign_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 查select
    selectByCourseId: function (sign_in, callback) {
        pool.query(sign_inSqlMap.selectByCourseId, sign_in.course_id, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },



};