import Router from 'koa-router';
import Pages from '../models/Pages';

const router = new Router({ prefix: '/api/pages' });

router.get('/:name', async ctx => {
  try {
    const { name } = ctx.params;
    const [page] = await Pages.query()
      .select('title', 'subtitle', 'wallpaper')
      .where('name', name);
    if (!page) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        msg: "can't find this page",
      };
    } else {
      ctx.status = 200;
      ctx.body = { status: 'success', page };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

export default router;
