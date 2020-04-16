'use strict'

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize; //获取 sequelize对应的数据类型映射

    const User = app.model.define('user', {
        user_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        user_name: STRING,
        user_password: STRING,
    });

    return User;
}