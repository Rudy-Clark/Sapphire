import Router from 'koa-router';
import passport from 'koa-passport';
import { isEmpty } from 'lodash';

import Posts from '../models/Posts';

const router = new Router({ prefix: '/user' });

router.use(async (ctx, next) =>
  passport.authenticate('jwt', (err, user) => {
    if (!user) {
      ctx.redirect('/auth/status');
    }
    // eslint-disable-next-line no-return-assign
    return next((ctx.state.user = user));
  })(ctx, next),
);

router.get('/posts', async ctx => {
  try {
    const { user } = ctx.state;
    if (isEmpty(user)) throw new Error('Unauthenticated');
    const posts = await Posts.query()
      .select('id', 'title', 'content', 'created_at', 'updated_at')
      .where('author_id', user.id);
    ctx.body = { status: 'success', posts };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

router.get('/posts/:id', async ctx => {
  try {
    const { id } = ctx.params;
    const { user } = ctx.state;
    if (isEmpty(user)) throw new Error('Unauthenticated');
    const posts = await Posts.query()
      .select('id', 'title', 'content', 'created_at', 'updated_at')
      .where('author_id', user.id)
      .where('id', id)
      .first();
    ctx.body = { status: 'success', posts: posts || null };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

export default router;
