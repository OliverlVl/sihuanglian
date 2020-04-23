'use strict';

const Service = require('egg').Service;

class StudentService extends Service {
    // 完善学生信息
    async updateStudentInfo(student) {
        const { ctx } = this;
        const result = await ctx.model.Student.update(student,
            {
                where: {
                    student_id: student.student_id
                }
            })
        return result;
    }
}

module.exports = StudentService;