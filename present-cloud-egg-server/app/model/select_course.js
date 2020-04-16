'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const SelectCourse = app.model.define('select_course', {
		select_course_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		student_id: {
			type: INTEGER,
			allowNull: false,
			references: {
				model: 'student',
				key: 'student_id'
			}
		},
		course_id: {
			type: INTEGER,
			allowNull: false,
			references: {
				model: 'course',
				key: 'course_id'
			}
		},
		create_time: {
			type: DATE,
			allowNull: true
		},
		creator: {
			type: STRING,
			allowNull: true
		},
		update_time: {
			type: DATE,
			allowNull: true
		},
		updater: {
			type: STRING,
			allowNull: true
		}
	}, {
		tableName: 'select_course'
	});
	return SelectCourse;
};
