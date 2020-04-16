'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE, DECIMAL } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Score = app.model.define('score', {
		score_id: {
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
		usual_score: {
			type: DECIMAL,
			allowNull: false
		},
		exam_score: {
			type: DECIMAL,
			allowNull: false
		},
		final_score: {
			type: DECIMAL,
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
		tableName: 'score'
	});
	return Score;
};
