var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var studentSqlMap = require('./studentSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    
    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: function (student, callback) {
        pool.query(studentSqlMap.insert, [student.student_number, student.student_name, student.student_sex, student.student_telephone, student.student_mailbox, student.student_born_time, student.student_school, student.student_college, student.student_class], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: function (student, callback) {
        pool.query(studentSqlMap.deleteById, student.student_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改学生姓名
    updateNameById: function (student, callback) {
        pool.query(studentSqlMap.deleteById, [student.student_name, student.student_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })

    },

    //////////////////////////// 查select ////////////////////////////

    // 根据id搜索一条记录
    selectById: function (student, callback) {
        pool.query(studentSqlMap.selectById, student.student_id, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },


};