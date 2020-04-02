var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var scoreSqlMap = require('./scoreSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: function (score, callback) {
        pool.query(scoreSqlMap.insert, [score.student_id, score.course_id, score.usual_score, score.exam_score, score.final_score], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: function (score, callback) {
        pool.query(scoreSqlMap.deleteById, score.score_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改分数信息
    updateById: function (score, callback) {
        pool.query(scoreSqlMap.updateById, [score.usual_score, score.exam_score, score.final_score, score.score_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    //////////////////////////// 查select ////////////////////////////

    // 根据学生id和课程id搜索该生某门课程成绩
    selectByStudentIdAndCourseId: function (score, callback) {
        pool.query(scoreSqlMap.selectByStudentIdAndCourseId, [score.student_id, score.course_id], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },



};