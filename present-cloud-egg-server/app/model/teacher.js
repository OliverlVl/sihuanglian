'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATEONLY, DATE } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Teacher = app.model.define('teacher', {
		teacher_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		teacher_number: {
			type: INTEGER,
			allowNull: true,
			defaultValue: null
		},
		teacher_name: {
			type: STRING,
			allowNull: true,
			defaultValue: null
		},
		teacher_sex: {
			type: INTEGER,
			allowNull: true,
			defaultValue: null
		},
		teacher_telephone: {
			type: STRING,
			allowNull: true,
			defaultValue: null,
			unique: true
		},
		student_mailbox: {
			type: STRING,
			allowNull: true,
			defaultValue: null
		},
		teacher_born_time: {
			type: DATEONLY,
			allowNull: true,
			defaultValue: null
		},
		teacher_school: {
			type: STRING,
			allowNull: true,
			defaultValue: null
		},
		teacher_college: {
			type: STRING,
			allowNull: true,
			defaultValue: null
		},
		create_time: {
			type: DATE,
			allowNull: true,
			defaultValue: null
		},
		creator: {
			type: STRING,
			allowNull: true,
			defaultValue: null
		},
		update_time: {
			type: DATE,
			allowNull: true,
			defaultValue: null
		},
		updater: {
			type: STRING,
			allowNull: true,
			defaultValue: null
		}
	}, {
		tableName: 'teacher'
	});
	return Teacher;
};
