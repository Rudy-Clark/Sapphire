import Router from 'koa-router';
import Posts from '../models/Posts';

const router = new Router({ prefix: '/posts' });

router.get('/', async ctx => {
  try {
    const posts = await Posts.query()
      .select('id', 'title', 'content', 'created_at', 'updated_at')
      .eager('[user(selectName), image(selectXs)]', {
        selectName: builder => builder.select('username'),
        selectXs: builder => builder.select('xs'),
      });
    ctx.body = { status: 'success', posts };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

router.get('/:id', async ctx => {
  try {
    const { id } = ctx.params;
    const post = await Posts.query()
      .eager('[user(selectName), image(selectImg), video(selectVid)]', {
        selectName: builder => builder.select('username'),
        selectImg: builder => builder.select('md', 'lg'),
        selectVid: builder => builder.select('uid'),
      })
      .select('id', 'title', 'content', 'created_at', 'updated_at')
      .findById(id);
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        msg: `Can't find this post`,
      };
    } else {
      ctx.status = 200;
      ctx.body = { status: 'success', post };
    }
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { status: 'error', msg: error };
  }
});

export default router;
