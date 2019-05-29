import Router from 'koa-router';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';

import Users from '../models/Users';
import { secretJwt } from '../passport';
import { parseError } from './helpers';

const router = new Router({ prefix: '/auth' });

router.post('/login', async (ctx, next) =>
  passport.authenticate('local', (err, user) => {
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        status: 'error',
        msg: 'Invalid password or email',
      };
    } else {
      const payload = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.username,
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
  })(ctx, next),
);

router.post('/reg', async ctx => {
  try {
    const { body } = ctx.request;
    await Users.checkUniqueness(body, ['username', 'email']);
    const newUser = await Users.createUser(body);

    const payload = {
      id: newUser.id,
      email: newUser.email,
      password: newUser.password,
      name: newUser.username,
      role: newUser.admin ? 'admin' : 'user',
    };

    const token = jwt.sign({ ...payload, password: null }, secretJwt);

    ctx.status = 201;
    ctx.body = {
      user: payload,
      status: 'success',
      token: `JWT ${token}`,
    };
  } catch (err) {
    if (!err) return;
    const errors = parseError(err);
    ctx.status = 422;
    ctx.body = {
      status: 'error',
      errorMsg: errors,
    };
  }
});

router.get('/status', async ctx => {
  try {
    await passport.authenticate('jwt', (err, user) => {
      if (user) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          msg: 'Authenticated',
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          status: 'error',
          msg: 'Unauthorized',
        };
      }
    });
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      msg: error,
    };
  }
});

export default router;
