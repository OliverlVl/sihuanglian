var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var select_course_courseSqlMap = require('./select_course_courseSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: function (select_course, callback) {
        pool.query(select_courseSqlMap.insert, [select_course.student_id, select_course.course_id], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: function (select_course, callback) {
        pool.query(select_courseSqlMap.deleteById, select_course.select_course_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 查select ////////////////////////////

    // 根据学生id搜索所有该生选课记录
    select_courseByStudentId: function (select_course, callback) {
        pool.query(select_courseSqlMap.select_courseByStudentId, select_course.student_id, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },



};