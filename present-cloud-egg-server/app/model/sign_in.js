'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const SignIn = app.model.define('sign_in', {
		sign_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		student_id: {
			type: INTEGER,
			allowNull: true,
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
		teacher_id: {
			type: INTEGER,
			allowNull: true,
			references: {
				model: 'teacher',
				key: 'teacher_id'
			}
		},
		student_place: {
			type: STRING,
			allowNull: true
		},
		sign_student_time: {
			type: DATE,
			allowNull: true
		},
		sign_teacher_time: {
			type: DATE,
			allowNull: true
		},
		sign_state: {
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
		tableName: 'sign_in'
	});
	return SignIn;
};
