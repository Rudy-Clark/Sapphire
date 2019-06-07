import Router from 'koa-router';
import passport from 'koa-passport';

import Users from '../models/Users';

const router = new Router({ prefix: '/admin' });

router.use(async (ctx, next) =>
  // eslint-disable-next-line consistent-return
  passport.authenticate('jwt', (err, user) => {
    if (!user.admin) {
      ctx.throw(403, 'Access denied');
    } else {
      // eslint-disable-next-line no-return-assign
      return next((ctx.state.user = user));
    }
  })(ctx, next),
);

router.get('/users', async ctx => {
  try {
    const users = await Users.query().eager('posts');
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      users,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      msg: error,
    };
  }
});

router.get('/users/:id', async ctx => {
  try {
    const { id } = ctx.params;
    const user = await Users.query()
      .findById(id)
      .where('admin', false);
    if (!user) ctx.throw(404, 'Not Found');
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      user,
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      msg: error,
    };
  }
});

export default router;
