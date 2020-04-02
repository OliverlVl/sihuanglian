var scoreSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: 'insert into score(student_id, course_id) values (?, ?)',
    
    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: 'delete from score where score_id = ?',

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改分数信息 
    updateById: 'update score set usual_score = ?, exam_score = ?, final_score = ? where score_id = ?',

    //////////////////////////// 查select ////////////////////////////

    // 根据学生id和课程id搜索该生某门课程成绩
    selectByStudentIdAndCourseId: 'select * from score where student_id = ? and course_id = ?',


};

module.exports = scoreSqlMap;