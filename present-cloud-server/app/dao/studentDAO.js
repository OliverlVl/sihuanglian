var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var studentSqlMap = require('./studentSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    // 增insert
    insert: function (student, callback) {
        pool.query(studentSqlMap.insert, [student.student_number,student.student_name,student.student_sex,student.student_telephone,student.student_mailbox,student.student_born_time,student.student_school,student.student_college,student.student_class], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    // 删delete
    deleteById:function(student,callback){
        pool.query(studentSqlMap.deleteById,[],function(error,result){
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 改update
    update

    // 查select
    selectById: function(student,callback){
        pool.query(studentSqlMap.selectById,student.studentId ,function(error,result){
            if (error) throw error;
            callback(result);
        })
    }, 


};