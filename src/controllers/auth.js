import Router from 'koa-router';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';

// import Users from '../models/Users';
import { secretJwt } from '../auth';

const router = new Router({ prefix: '/auth' });

router.post('/login', async (ctx, next) => {
  await passport.authenticate('local', (err, user) => {
    if (!user) {
      ctx.status = 403;
      ctx.body = {
        status: 'error',
        msg: 'Invalid password or email',
      };
    } else {
      const payload = {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.admin ? 'admin' : 'user',
      };

      const token = jwt.sign(payload, secretJwt);
      ctx.status = 200;
      ctx.body = {
        name: user.username,
        status: 'success',
        token: `JWT ${token}`,
      };
    }
  })(ctx, next);
});

export default router;
