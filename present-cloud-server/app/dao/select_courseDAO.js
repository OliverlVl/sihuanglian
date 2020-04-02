var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var select_course_courseSqlMap = require('./select_course_courseSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    // 增insert
    insert: function (select_course, callback) {
        pool.query(select_courseSqlMap.insert, [select_course.student_id, select_course.course_id], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    // 删delete
    deleteById: function (select_course, callback) {
        pool.query(select_courseSqlMap.deleteById, select_course.select_course_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 查select
    select_courseByStudentId: function (select_course, callback) {
        pool.query(select_courseSqlMap.select_courseByStudentId, select_course.student_id, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },



};