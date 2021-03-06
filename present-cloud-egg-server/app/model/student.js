'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE, DATEONLY } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Student = app.model.define('student', {
		student_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		student_number: {
			type: INTEGER,
			allowNull: true
		},
		student_name: {
			type: STRING,
			allowNull: true
		},
		student_sex: {
			type: INTEGER,
			allowNull: true
		},
		student_telephone: {
			type: STRING,
			allowNull: true,
			unique: true
		},
		student_mailbox: {
			type: STRING,
			allowNull: true
		},
		student_born_time: {
			type: DATEONLY,
			allowNull: true
		},
		student_school: {
			type: STRING,
			allowNull: true
		},
		student_college: {
			type: STRING,
			allowNull: true
		},
		total_experience_point: {
			type: INTEGER,
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
		tableName: 'student'
	});
	return Student;
};
