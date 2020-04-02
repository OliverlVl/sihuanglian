var sign_inSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: 'insert into sign_in(course_id, teacher_id, sign_teacher_time) values (?,?,?)',
    
    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: 'delete from sign_in where sign_id = ?',

    //////////////////////////// 改update ////////////////////////////

    // 根据id添加学生签到信息
    updateById: 'update sign_in set student_id = ?, student_place = ?, sign_student_time = ? where sign_id = ?',
    
    //////////////////////////// 查select ////////////////////////////

    // 根据课程id搜索所有签到记录
    selectByCourseId: 'select * from sign_in where course_id = ?'


};

module.exports = sign_inSqlMap;