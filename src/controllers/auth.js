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
        msg: 'Неверный E-mail или Пароль',
      };
    } else {
      const token = jwt.sign({ id: user.id }, secretJwt, {
        expiresIn: '30d',
      });
      ctx.status = 200;
      ctx.body = {
        user: {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
        },
        status: 'success',
        token: `Bearer ${token}`,
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
      name: newUser.username,
      role: newUser.admin ? 'admin' : 'user',
    };

    const token = jwt.sign({ id: payload.id }, secretJwt, {
      expiresIn: '30d',
    });

    ctx.status = 201;
    ctx.body = {
      user: payload,
      status: 'success',
      token: `Bearer ${token}`,
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

router.get('/status', async (ctx, next) => {
  try {
    await passport.authenticate('jwt', (err, user) => {
      if (err) throw new Error(err);
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
          msg: 'Unauthenticated',
        };
      }
    })(ctx, next);
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      msg: error,
    };
  }
});

router.get('/logout', async (ctx, next) => {
  try {
    await passport.authenticate('jwt', (err, user) => {
      if (user) {
        ctx.status = 200;
        ctx.body = { status: 'success' };
      } else {
        throw new Error('Cant find Bearer Token');
      }
    })(ctx, next);
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      msg: error,
    };
  }
});

export default router;
