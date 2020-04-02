var courseSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: 'insert into course(course_number, course_name, course_school, course_college, course_teacher_id, course_term_time, course_week_time, course_introduction, course_exam_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    
    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: 'delete from course where course_id = ?',

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改课程考试时间
    updateCourseExamTimeById: 'update course set course_exam_time = ? where course_id = ?',
    
    //////////////////////////// 查select ////////////////////////////

    // 根据教师id搜索该教师所上的课程信息
    selectByCourseTeacherId: 'select * from course where course_teacher_id = ?'


};

module.exports = courseSqlMap;