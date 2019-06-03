import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import request from './request';
import user from './user';
import formErrors from './form';

export default history =>
  combineReducers({
    router: connectRouter(history),
    request,
    user,
    formErrors,
  });
