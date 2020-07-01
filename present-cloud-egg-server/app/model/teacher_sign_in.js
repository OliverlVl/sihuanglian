'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const TeacherSignIn = app.model.define('teacher_sign_in', {
		teacher_sign_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		course_id: {
			type: INTEGER,
            allowNull: true,
            references: {
				model: 'course',
				key: 'course_id'
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
        teacher_id: {
			type: INTEGER,
			allowNull: true,
			references: {
				model: 'teacher',
				key: 'teacher_id'
			}
		},
		state: {
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
		tableName: 'teacher_sign_in'
	});
	return TeacherSignIn;
};
