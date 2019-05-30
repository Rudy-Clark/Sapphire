import Router from 'koa-router';
import Posts from '../models/Posts';

const router = new Router({ prefix: '/posts' });

router.get('/', async ctx => {
  try {
    const posts = await Posts.query();
    ctx.body = { status: 'success', posts };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

router.get('/:id', async ctx => {
  try {
    const { id } = ctx.params;
    const post = await Posts.query().findById(id);
    if (!post) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        msg: `Can't find this post`,
      };
    } else {
      ctx.status = 200;
      ctx.body = { status: 'success', post };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

export default router;
