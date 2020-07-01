'use strict';

const Service = require('egg').Service;

class CourseService extends Service {

    // 根据课程id获取课程信息
    async selcetCourseInfoByCourseId(courseId) {
        const { ctx } = this
        const result = await ctx.model.Course.findOne({
            where: {
                course_id: courseId,
            },
        })
        if (result != 0) {
            return result
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


}

module.exports = CourseService;