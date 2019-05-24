import Router from 'koa-router';
import * as queries from '../db/queries/pages';

const router = new Router();

router.get('/api/pages/:name', async ctx => {
  try {
    const { name } = ctx.params;
    const [page] = await queries.getPageFromName(name);
    ctx.status = 200;
    ctx.body = { status: 'success', page };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

export default router;
