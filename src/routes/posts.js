import Router from 'koa-router';
import * as queries from '../db/queries/posts';

const router = new Router();
const BASE_URL = '/api/posts';

router.get(BASE_URL, async ctx => {
  try {
    const posts = await queries.getAllPosts();
    ctx.body = { status: 'success', posts };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

export default router;
