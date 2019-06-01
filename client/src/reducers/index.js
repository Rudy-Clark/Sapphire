import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import request from './request';
import page from './page';
import user from './user';

export default history =>
  combineReducers({
    router: connectRouter(history),
    request,
    page,
    user,
  });
