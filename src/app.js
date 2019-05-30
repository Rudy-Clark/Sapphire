import '@babel/polyfill';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import serve from 'koa-static';
import path from 'path';

import apiPosts from './controllers/posts';
import apiPages from './controllers/pages';
import apiAuth from './controllers/auth';
import apiUsers from './controllers/user-posts';
import passport from './passport';

const app = new Koa();
const PORT = process.env.PORT || 1337;

// middlewares
app.use(logger());
app.use(serve(path.join(__dirname, 'client/build')));
app.use(bodyParser());
app.use(passport.initialize());

// Routes
app.use(apiPosts.routes());
app.use(apiPages.routes());
app.use(apiAuth.routes());
app.use(apiUsers.routes());

export const server = app.listen(PORT, () => {
  console.log(`App listen on http://localhost:${PORT}`);
});

export default app;
