var sign_inSqlMap = {

    // 增
    insert: 'insert into sign_in(course_id, teacher_id, sign_teacher_time) values (?,?,?)',
    // 删
    deleteById: 'delete from sign_in where sign_id = ?',
    // 改 
    updateById: 'update sign_in set student_id = ?, student_place = ?, sign_student_time = ? where sign_id = ?',
    // 查
    selectByCourseId: 'select * from sign_in where course_id = ?'


};

module.exports = sign_inSqlMap;