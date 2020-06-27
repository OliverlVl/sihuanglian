'use strict'
/* jshint indent: 1 */

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Menu = app.model.define('menu', {
		id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: STRING,
			allowNull: false
		},
		state: {
			type: INTEGER,
			allowNull: true
		},
		layer: {
			type: INTEGER,
			allowNull: true
		},
		sub: {
			type: STRING,
			allowNull: true
		}
	}, {
		tableName: 'menu'
	});

	return Menu;
};
