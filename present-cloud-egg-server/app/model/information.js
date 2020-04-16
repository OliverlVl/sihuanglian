'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE, TEXT } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Information = app.model.define('information', {
		information_id: {
			type:  INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		information_name: {
			type: STRING,
			allowNull: false
		},
		information_context: {
			type: TEXT,
			allowNull: false
		},
		admin_id: {
			type:  INTEGER,
			allowNull: false,
			references: {
				model: 'admin',
				key: 'admin_id'
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
		tableName: 'information'
	});
	return Information;
};
