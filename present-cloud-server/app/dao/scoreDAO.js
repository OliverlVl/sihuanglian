var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var scoreSqlMap = require('./scoreSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    // 增insert
    insert: function (score, callback) {
        pool.query(scoreSqlMap.insert, [score.student_id, score.course_id, score.usual_score, score.exam_score, score.final_score], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },

    // 删delete
    deleteById: function (score, callback) {
        pool.query(scoreSqlMap.deleteById, score.score_id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 改update
    updateById: function (score, callback) {
        pool.query(scoreSqlMap.updateById, [score.usual_score, score.exam_score, score.final_score, score.score_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        })
    },

    // 查select
    selectByStudentIdAndCourseId: function (score, callback) {
        pool.query(scoreSqlMap.selectByCourseId, [score.student_id, score.course_id], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },



};