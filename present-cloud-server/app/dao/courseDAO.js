var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var courseSqlMap = require('./courseSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    // 增insert
    insert: function (course, callback) {
        pool.query(courseSqlMap.insert, [course.course_number, course.course_name, course.course_school, course.course_college, course.course_teacher_id, course.course_term_time, course.course_week_time, course.course_introduction, course.course_exam_time], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    // 删delete
    deleteById: function (course, callback) {
        pool.query(courseSqlMap.deleteById, course.course_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 改update
    updateCourseExamTimeById: function (course, callback) {
        pool.query(courseSqlMap.updateCourseExamTimeById, [course.course_exam_time, course.course_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 查select
    selectByCourseTeacherId: function (course, callback) {
        pool.query(courseSqlMap.selectByCourseTeacherId, course.course_teacher_id, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },


};