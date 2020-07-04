'use strict';

const Service = require('egg').Service;

class CourseService extends Service {

    // 根据课程id获取课程信息
    async selcetCourseInfoByCourseId(course_number) {
        const { ctx } = this
        const result = await ctx.model.Course.findOne({
            where: {
                course_number: course_number, //课程号
            },
        })
        // console.log(result)
        const selectCourse = await ctx.model.SelectCourse.findAll({
            where: {
                course_id: courseId
            }
        })
        var list = []
        for (var i = 0; i < selectCourse.length; i++) {
            var student = await ctx.model.Student.findOne({
                where: {
                    student_id: selectCourse[i].dataValues.student_id
                }
            })
            var object = {
                student_name: student.dataValues.student_name,
                student_number: student.dataValues.student_number
            }
            list.push(object)

        }
        result.dataValues["list"] = list

        // 获取教师名字
        const teacher = await ctx.model.Teacher.findOne({
            where:{
                teacher_id: result.course_teacher_id
            }
        })

        result.dataValues["teacher_name"] = teacher.teacher_name

        if (result != null) {
            return {
                code: 1,
                msg: result
            }
        } else {
            return {
                code: -1,
                msg: "班课不存在"
            }
        }

    }

    // 学生通过班课编号查找班课
    async selectCourse(course_number) {
        const { ctx } = this
        const result = await ctx.model.Course.findAll({
            where: {
                course_number: course_number,
            },
        })
        // console.log(result)
        if (result != 0) {
            return result
        } else {
            return {
                code: -1,
                msg: "班课不存在"
            }
        }
    }

    //根据教师id获取课程信息
    async selcetCourseInfoByTeacher(teacherId) {
        const { ctx } = this
        const course_teacher_id = 1 // 用token解析出 教师id
        const result = await ctx.model.Course.findAll({
            where: {
                course_teacher_id: course_teacher_id,
            },
        })
        console.log(result)
        if (result != null) {
            return {
                code: 1,
                msg: result
            }
        } else {
            return {
                code: -1,
                msg: "班课不存在"
            }
        }

    }


    // 创建班课接口
    async createCourse(courseMsg) {
        const { ctx } = this;
        console.log(courseMsg) // courseId 还没用到

        const result = await ctx.model.Course.create({
            course_name: courseMsg.course,
            course_class: courseMsg.class,
            course_teacher_id: courseMsg.teacher
        })
        if (result == null) {
            return {
                code: -1,
                msg: "创建失败"
            }
        }
        return result.dataValues;
    }

}

module.exports = CourseService;