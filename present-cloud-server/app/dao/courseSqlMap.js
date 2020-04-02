var courseSqlMap = {

    // 增
    insert:'insert into course(course_number, course_name, course_school, course_college, course_teacher_id, course_term_time, course_week_time, course_introduction, course_exam_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    // 删
    deleteById:'delete from course where course_id = ?',
    // 改 
    updateCourseExamTimeById:'update course set course_exam_time = ? where course_id = ?',
    // 查
    selectByCourseTeacherId:'select * from course where course_teacher_id = ?'


};

module.exports = courseSqlMap;