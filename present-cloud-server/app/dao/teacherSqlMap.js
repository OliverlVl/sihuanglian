var teacherSqlMap = {

    // 增
    insert: 'insert into teacher(teacher_number, teacher_name, teacher_sex, teacher_telephone, teacher_mailbox, teacher_born_time, teacher_school, teacher_college) values (?, ?, ?, ?, ?, ?, ?, ?)',
    // 删
    deleteById: 'delete from teacher where teacher_id = ?',
    // 改 
    updateNameById: 'update teacher set teacher_name = ? where teacher_id = ?',
    // 查
    selectById: 'select * from teacher where teacher_id = ?'


};

module.exports = teacherSqlMap;