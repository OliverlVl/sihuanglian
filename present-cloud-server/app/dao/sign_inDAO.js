var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var sign_inSqlMap = require('./sign_inSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条教师签到记录
    insert: function (sign_in, callback) {
        pool.query(sign_inSqlMap.insert, [sign_in.course_id, sign_in.teacher_id, sign_in.sign_teacher_time], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: function (sign_in, callback) {
        pool.query(sign_inSqlMap.deleteById, sign_in.sign_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 改update ////////////////////////////

    // 根据id添加学生签到信息
    updateById: function (sign_in, callback) {
        pool.query(sign_inSqlMap.updateById, [sign_in.student_id, sign_in.student_place, sign_in.sign_student_time, sign_in.sign_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 查select ////////////////////////////

    // 根据课程id搜索所有签到记录
    selectByCourseId: function (sign_in, callback) {
        pool.query(sign_inSqlMap.selectByCourseId, sign_in.course_id, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },



};