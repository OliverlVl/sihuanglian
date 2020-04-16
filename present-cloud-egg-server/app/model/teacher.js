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
			allowNull: false
		},
		teacher_name: {
			type: STRING,
			allowNull: false
		},
		teacher_sex: {
			type: STRING,
			allowNull: false
		},
		teacher_telephone: {
			type: INTEGER,
			allowNull: false,
			unique: true
		},
		student_mailbox: {
			type: STRING,
			allowNull: true
		},
		teacher_born_time: {
			type: DATEONLY,
			allowNull: true
		},
		teacher_school: {
			type: STRING,
			allowNull: false
		},
		teacher_college: {
			type: STRING,
			allowNull: false
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
		tableName: 'teacher'
	});
	return Teacher;
};
