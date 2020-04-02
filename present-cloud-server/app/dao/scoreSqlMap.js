var scoreSqlMap = {

    // 增
    insert:'insert into score(student_id, course_id) values (?, ?)',
    // 删
    delete:'delete from score where score_id = ?',
    // 改 
    update:'update score set usual_score = ?, exam_score = ?, final_score = ? where score_id = ?',
    // 查
    select:'select * from score where student_id = ? and course_id = ?'


};

module.exports = scoreSqlMap;