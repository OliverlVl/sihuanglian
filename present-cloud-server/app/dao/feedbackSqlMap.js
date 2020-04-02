var feedbackSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: 'insert into feedback(user_id, role, content) values (?, ?, ?)',

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: 'delete from feedback where feedback_id = ?',
    
    //////////////////////////// 查select ////////////////////////////

    // 搜索所有反馈信息
    selectAll: 'select * from feedback'


};

module.exports = feedbackSqlMap;