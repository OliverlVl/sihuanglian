'use strict';

const Service = require('egg').Service;

class StudentService extends Service {


    //获取所有学生
    async selectStudentAll() {
        const { ctx } = this
        const result = await ctx.model.Student.findAll()
        return result;
    }

    //查询具体id角色信息
    async selectStudentById(studentId) {
        const { ctx } = this
        const result = await ctx.model.Student.findOne({
            where: {
                student_id: studentId
            }
        })
        if (result != 0) {
            return result
        } else {
            return {
                code: -1,
                msg: "查询失败"
            }
        }
    }


    // 完善学生信息
    async updateStudent(studentId, number, name, sex, mailbox, telephone) {
        const { ctx } = this;
        const result = await ctx.model.Student.update(
            {
                student_number: number,
                student_name: name,
                student_sex: sex,
                student_maibox: mailbox,
                student_telephone: telephone
            },
            {
                where: {
                    student_id: studentId
                }
            })
        if (result != 0) {
            return {
                code: 200,
                msg: "修改成功"
            }
        } else {
            return {
                code: -1,
                msg: "修改失败"
            }
        }
    }


    // 根据id删除学生
    async deleteStudentById(studentId) {
        const { ctx } = this
        const result = await ctx.model.Student.destroy({
            where: {
                student_id: studentId
            }
        })
        if (result != 0) {
            return {
                code: 200,
                msg: "删除成功"
            }
        } else {
            return {
                code: -1,
                msg: "删除失败"
            }
        }
    }



}

module.exports = StudentService;