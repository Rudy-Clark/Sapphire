import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import apiPosts from './routes/posts';

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());
app.use(apiPosts.routes());

export const server = app.listen(PORT, () => {
  console.log(`App listen on http://localhost:${PORT}`);
});
