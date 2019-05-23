import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import serve from 'koa-static';

import apiPosts from './routes/posts';

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(logger());
app.use(serve('./client/build'));
app.use(bodyParser());
app.use(apiPosts.routes());

export const server = app.listen(PORT, () => {
  console.log(`App listen on http://localhost:${PORT}`);
});
