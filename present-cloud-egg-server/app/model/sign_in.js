'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE, FLOAT } = app.Sequelize; //获取 sequelize对应的数据类型映射

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
		teacher_sign_id: {
			type: INTEGER,
			allowNull: true,
			references: {
				model: 'teacher_sign_in',
				key: 'teacher_sign_id'
			}
		},
		longitude: {
			type: STRING,
			allowNull: true
		},
		latitude: {
			type: STRING,
			allowNull: true
		},
		distance: {
			type: FLOAT,
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
