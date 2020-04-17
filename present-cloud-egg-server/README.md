# present-cloud-egg-server



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


### controller模板
    'use strict';

    const Controller = require('egg').Controller;

    class XXXController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }
    }

    module.exports = XXXController;

### service模板
    'use strict';

    const Service = require('egg').Service;

    class XXXService extends Service {
    async index() {
        
    }
    }

    module.exports = XXXService;

### model模板
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