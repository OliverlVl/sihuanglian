/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587018386698_6134';

  // add your middleware config here
  config.middleware = [];

  //数据库ORM
  config.sequelize = {
    dialect: 'mysql', // 表示使用mysql
    host: '127.0.0.1', // 连接的数据库主机地址
    port: 3306, // mysql服务端口
    database: 'present-cloud', // 数据库名
    username: 'root', // 数据库用户名
    password: 'Admin888', // 数据库密码
    define: { // model的全局配置
      //freezeTableName默认值是 false 如果是false的话，会自动在表名后加s复数
      freezeTableName: true, // 防止修改表名为复数
      //timestamps默认值是true，如实是true会自动添加上 create_time 和update_time两个字段
      timestamps: false, // 添加create,update,delete时间戳
      // 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
      underscored: false, // 防止驼峰式字段被默认转为下划线
      paranoid: true // 添加软删除
    },
    timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    }
  };

  // 跨域请求
  config.security = {
    csrf: {
      enable: false //允许跨域访问,关闭csrf认证
    }
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
