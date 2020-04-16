'use strict'
/* jshint indent: 1 */

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Admin = app.model.define('admin', {
		admin_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		admin_number: {
			type: INTEGER,
			allowNull: false
		},
		admin_name: {
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
		tableName: 'admin'
	});

	return Admin;
};
