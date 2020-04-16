'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE, DATEONLY } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Class = app.model.define('class', {
		class_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		class_name: {
			type: STRING,
			allowNull: false
		},
		class_life_time: {
			type: DATEONLY,
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
		tableName: 'class'
	});
	return Class;
};
