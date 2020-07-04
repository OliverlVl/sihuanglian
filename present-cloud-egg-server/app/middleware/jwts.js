const JWT = require('jsonwebtoken');

module.exports = (options, app) => {
  return async function (ctx, next) {
    // 拿到传会数据的header 中的token值
    const token = ctx.request.header.authorization;
    const method = ctx.method.toLowerCase();
    // 当前请求时get请求，执行接下来的中间件
    if (method === 'get') {

      await next();
      // 当前token值不存在的时候
    } else if (!token) {
      //  不验证token的页面
      // if (ctx.path === '/login' || ctx.path === '/register') {
      if (true) {  // 取消jwt 测试
        await next();
      } else {
        ctx.throw(401, '未登录， 请先登录');
      }
    } else { // 当前token值存在
      let decode;
      try {
        // 验证当前token
        console.log(111111111)
        console.log(token)
        decode = JWT.verify(token, options.secret);
        console.log(decode)
        // decode = ctx.app.jwt.verify(token, "123456");
        if (!decode || !decode.account) {
          ctx.throw(401, '没有权限，请登录');
        } else {
          console.log(decode)
        }
        if (Date.now() - decode.expire > 0) {
          ctx.throw(401, 'Token已过期');
        }
        // const user = await ctx.model.Login.findOne({
        //   where: {
        //     login_name: decode.account,
        //   }
        // });
        // console.log(user.dataValues)
        // if (user) {
        //   await next();
        // } else {
        //   ctx.throw('401', '用户信息验证失败');
        // }
      } catch (e) {
        console.log(e);
      }
    }
  };
};