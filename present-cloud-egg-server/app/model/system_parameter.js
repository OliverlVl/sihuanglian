'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const SystemParameter = app.model.define('system_parameter', {
		id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		parameter_name: {
			type: STRING,
			allowNull: true
        },
        parameter_value: {
			type: STRING,
			allowNull: true
		},
		
	}, {
		tableName: 'system_parameter'
	});
	return SystemParameter;
};
