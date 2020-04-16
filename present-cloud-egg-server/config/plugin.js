'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 数据库ORM
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  // 跨域请求
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
