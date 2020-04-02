var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var teacherSqlMap = require('./teacherSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    // 增insert
    insert: function (teacher, callback) {
        pool.query(teacherSqlMap.insert, [teacher.teacher_number, teacher.teacher_name, teacher.teacher_sex, teacher.teacher_telephone, teacher.teacher_mailbox, teacher.teacher_born_time, teacher.teacher_school, teacher.teacher_college], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    // 删delete
    deleteById: function (teacher, callback) {
        pool.query(teacherSqlMap.deleteById, teacher.teacher_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 改update
    updateNameById: function (teacher, callback) {
        pool.query(teacherSqlMap.deleteById, [teacher.teacher_name, teacher.teacher_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })

    },

    // 查select
    selectById: function (teacher, callback) {
        pool.query(teacherSqlMap.selectById, teacher.teacher_id, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

};