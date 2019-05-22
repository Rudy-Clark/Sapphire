import Koa from 'koa';
import Router from 'koa-router';

import apiPosts from './routes/posts';

const app = new Koa();
const PORT = process.env.PORT || 1337;
const router = new Router();

router.get('/', async ctx => {
  ctx.body = 'Hello World';
});

app.use(apiPosts.routes());

export default app.listen(PORT, () => {
  console.log(`App run on http://localhost:${PORT}`);
});
