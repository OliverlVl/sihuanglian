'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE, TEXT } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Feedback = app.model.define('feedback', {
		feedback_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: INTEGER,
			allowNull: false
		},
		role: {
			type: INTEGER,
			allowNull: false
		},
		content: {
			type: TEXT,
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
		tableName: 'feedback'
	});
	return Feedback;
};
