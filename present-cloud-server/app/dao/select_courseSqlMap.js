var select_courseSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: 'insert into select_course(student_id, course_id) values (?, ?)',

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: 'delete from select_course where select_course_id = ?',
    
    //////////////////////////// 查select ////////////////////////////

    // 根据学生id搜索所有该生选课记录
    select_courseByStudentId: 'select * from select_course where student_id = ?'


};

module.exports = select_courseSqlMap;