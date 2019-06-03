/* eslint-disable no-constant-condition */
import { fork, all } from 'redux-saga/effects';

// import watchNav from './navigation';
import watchAuth from './authentication';

function* rootSaga() {
  yield all([fork(watchAuth)]);
}

export default rootSaga;
