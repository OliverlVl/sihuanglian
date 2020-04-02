var select_courseSqlMap = {

    // 增
    insert: 'insert into select_course(student_id, course_id) values (?, ?)',
    // 删
    deleteById: 'delete from select_course where select_course_id = ?',
    // 查
    select_courseByStudentId: 'select * from select_course where student_id = ?'


};

module.exports = select_courseSqlMap;