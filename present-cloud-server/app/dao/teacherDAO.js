var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var teacherSqlMap = require('./teacherSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    
    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: function (teacher, callback) {
        pool.query(teacherSqlMap.insert, [teacher.teacher_number, teacher.teacher_name, teacher.teacher_sex, teacher.teacher_telephone, teacher.teacher_mailbox, teacher.teacher_born_time, teacher.teacher_school, teacher.teacher_college], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: function (teacher, callback) {
        pool.query(teacherSqlMap.deleteById, teacher.teacher_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改教师姓名
    updateNameById: function (teacher, callback) {
        pool.query(teacherSqlMap.deleteById, [teacher.teacher_name, teacher.teacher_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })

    },

    //////////////////////////// 查select ////////////////////////////

    // 根据id搜索一条记录
    selectById: function (teacher, callback) {
        pool.query(teacherSqlMap.selectById, teacher.teacher_id, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

};