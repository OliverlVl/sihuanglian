var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var classSqlMap = require('./classSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: function (class1, callback) {
        pool.query(classSqlMap.insert,
            [class1.class_name, class1.class_life_time, class1.create_time, class1.creator, class1.update_time, class1.updater],
            function (error, result) {
                if (error) throw error;
                callback(result);
            })
    },

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: function (class1, callback) {
        pool.query(classSqlMap.deleteById,
            class1.class_id,
            function (error, result) {
                if (error) throw error;
                callback(result);
            })
    },

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改班级信息
    updateById: function (class1, callback) {
        pool.query(classSqlMap.updateById,
            [class1.class_name, class1.class_life_time, class1.updater, class1.class_id],
            function (error, result) {
                if (error) throw error;
                callback(result);
            })
    },

    //////////////////////////// 查select ////////////////////////////

    // 查看所有班级信息
    selectAll: function (class1, callback) {
        pool.query(classSqlMap.selectAll,
            function (error, result) {
                if (error) throw error;
                callback(result);
            })
    }



};