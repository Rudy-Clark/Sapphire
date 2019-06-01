/* eslint-disable no-constant-condition */
import { fork, all } from 'redux-saga/effects';

import watchNav from './navigation';

function* rootSaga() {
  yield all([fork(watchNav)]);
}

export default rootSaga;
