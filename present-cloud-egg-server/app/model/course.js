'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Course = app.model.define('course', {
		course_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		course_number: {
			type: INTEGER,
			allowNull: false
		},
		course_name: {
			type: STRING,
			allowNull: false
		},
		course_class: {
			type: STRING,
			allowNull: false
		},
		course_teacher_id: {
			type: INTEGER,
			allowNull: false,
			references: {
				model: 'teacher',
				key: 'teacher_id'
			}
		},
		course_image: {
			type: STRING,
			allowNull: true
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
		tableName: 'course'
	});
	return Course;
};
