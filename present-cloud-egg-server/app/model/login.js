'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Login = app.model.define('login', {
		login_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		login_name: {
			type: STRING,
			allowNull: true
		},
		login_password: {
			type: STRING,
			allowNull: true
		},
		login_type: {
			type: INTEGER,
			allowNull: true
		},
		user_id: {
			type: INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'login'
	});
	return Login;
};
