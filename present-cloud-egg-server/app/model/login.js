'use strict'
/* jshint indent: 1 */

module.exports = app => {
	const { STRING, INTEGER } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const Login = app.model.define('login', {
		login_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		// 别名
		// id: {
		// 	type: INTEGER,
		// 	allowNull: false,
		// 	primaryKey: true,
		// 	autoIncrement: true,
		// 	field: 'login_id',
		// },
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
