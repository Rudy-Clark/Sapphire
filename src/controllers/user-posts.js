import Router from 'koa-router';
import passport from 'koa-passport';

import Posts from '../models/Posts';

const router = new Router({ prefix: '/users' });

router.use(async (ctx, next) =>
  passport.authenticate('jwt', (err, user) => {
    if (!user) {
      ctx.redirect('/auth/status');
    }
    // eslint-disable-next-line no-return-assign
    return next((ctx.user = user));
  })(ctx, next),
);

router.get('/posts', async ctx => {
  try {
    const posts = await Posts.query();
    ctx.body = { status: 'success', posts };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

export default router;
