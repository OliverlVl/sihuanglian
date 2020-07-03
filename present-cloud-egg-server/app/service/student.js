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

        // 查找
        const student = await ctx.model.Student.findOne({
            where: {
                student_id: studentId
            }
        })
        console.log(student.student_name)

        //修改该学生表
        const result = await ctx.model.Student.update(
            {
                student_number: number,
                student_name: name,
                student_sex: sex,
                student_mailbox: mailbox,
                student_telephone: telephone
            },
            {
                where: {
                    student_id: studentId
                }
            }
        )
        // 修改登入表信息
        if(student.student_name != name){
            const result1 = await ctx.model.Login.update(
                {
                    login_name: name
                },
                {
                    where: {
                        user_id: studentId,
                        login_type: 1,
                        login_name: student.student_name
                    }
                }
            )
        }
        if(student.student_telephone != telephone){
            const result2 = await ctx.model.Login.update(
                {
                    login_name: telephone
                },
                {
                    where: {
                        user_id: studentId,
                        login_type: 1,
                        login_name: student.student_telephone
                    }
                }
            )
            console.log(result2)
        }
        console.log(student.student_mailbox)
        console.log(mailbox)
        if(student.student_maibox != mailbox){
            const result3 = await ctx.model.Login.update(
                {
                    login_name: mailbox
                },
                {
                    where: {
                        user_id: studentId,
                        login_type: 1,
                        login_name: student.student_mailbox
                    }
                }
            )
        }
        console.log(result)
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


    //----------------------------------------------------------app----------------------------------------------------------

    // 更改学生手机号
    async updatePhone(id, newPhone) {
        const { ctx } = this
        // 查看是否已存在手机号
        const result = await ctx.model.Student.findOne({
            where: {
                student_telephone: newPhone
            }
        })
        if (result != null) {
            return {
                code: -2,
                msg: "手机号已存在"
            }
        }
        // 修改学生表手机号
        const result1 = await ctx.model.Student.update(
            {
                student_telephone: newPhone
            },
            {
                where: {
                    student_id: id
                }
            })
        // 修改登入表手机号
        const result2 = await ctx.model.Login.update(
            {
                login_name: newPhone
            },
            {
                where: {
                    user_id: id,
                    login_type: 1 // 学生
                }
            }
        )
        if (result1 != 0 & result2 != 0) {
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



}

module.exports = StudentService;