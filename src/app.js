import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import serve from 'koa-static';
import path from 'path';

import apiPosts from './controllers/posts';
import apiPages from './controllers/pages';

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(logger());
app.use(serve(path.join(__dirname, 'client/build')));
app.use(bodyParser());

// Routes
app.use(apiPosts.routes());
app.use(apiPages.routes());

export const server = app.listen(PORT, () => {
  console.log(`App listen on http://localhost:${PORT}`);
});
