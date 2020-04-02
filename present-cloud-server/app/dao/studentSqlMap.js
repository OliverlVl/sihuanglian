var studentSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: 'insert into student(student_number, student_name, student_sex, student_telephone, student_mailbox, student_born_time, student_school, student_college, student_class) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    
    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: 'delete from student where student_id = ?',
    
    //////////////////////////// 改update ////////////////////////////

    // 根据id修改学生姓名
    updateNameById: 'update student set student_name = ? where student_id = ?',

    //////////////////////////// 查select ////////////////////////////

    // 根据id搜索一条记录
    selectById: 'select * from student where student_id = ?'


};

module.exports = studentSqlMap;