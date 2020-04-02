var feedbackSqlMap = {

    // 增
    insert: 'insert into feedback(user_id, role, content) values (?, ?, ?)',
    // 删
    deleteById: 'delete from feedback where feedback_id = ?',
    // 查
    selectAll: 'select * from feedback'


};

module.exports = feedbackSqlMap;