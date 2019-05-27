import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';

import User from './models/Users';

export const secretJwt = 'Talk is cheap, show me the code';

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

const options = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

passport.use(
  new LocalStrategy(options, async (email, password, done) => {
    try {
      const user = await User.query().findOne({ email });
      if (!user) {
        done(null, false);
      } else if (!comparePass(password, user.password)) {
        done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretJwt,
};

passport.use(
  new Strategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.query().findById(payload.id);
      if (user) done(null, user);
      else done(null, false);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);

export default passport;
