var studentSqlMap = {

    // 增
    insert: 'insert into student(student_number, student_name, student_sex, student_telephone, student_mailbox, student_born_time, student_school, student_college, student_class) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    // 删
    deleteById: 'delete from student where student_id = ?',
    // 改 
    updateNameById: 'update student set student_name = ? where student_id = ?',
    // 查
    selectById: 'select * from student where student_id = ?'


};

module.exports = studentSqlMap;