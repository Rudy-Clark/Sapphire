import Router from 'koa-router';
import Posts from '../models/Posts';

const router = new Router();
const BASE_URL = '/api/posts';

router.get(BASE_URL, async ctx => {
  try {
    const posts = await Posts.query();
    ctx.body = { status: 'success', posts };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

export default router;
