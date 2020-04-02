var teacherSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: 'insert into teacher(teacher_number, teacher_name, teacher_sex, teacher_telephone, teacher_mailbox, teacher_born_time, teacher_school, teacher_college) values (?, ?, ?, ?, ?, ?, ?, ?)',
    
    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: 'delete from teacher where teacher_id = ?',

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改教师姓名
    updateNameById: 'update teacher set teacher_name = ? where teacher_id = ?',

    //////////////////////////// 查select ////////////////////////////

    // 根据id搜索一条记录
    selectById: 'select * from teacher where teacher_id = ?'


};

module.exports = teacherSqlMap;