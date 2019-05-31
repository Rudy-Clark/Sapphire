/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, all } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { ROUTE_CHANGE, REQUEST, REQUEST_SUCCESS } from '../actions/constants';
import { setReqError } from '../actions';
import { loadPage } from '../api';

function* execLoad(fetch) {
  yield put({ type: REQUEST });
  try {
    const response = yield fetch();
    if (isEmpty(response)) yield put(setReqError('Server Error'));
    yield put({ type: REQUEST_SUCCESS });
  } catch (error) {

  }
}

function* watchNav() {
  while (true) {
    const { payload } = yield take(ROUTE_CHANGE);
    const fetch = yield loadPage(payload);
    yield fork(execLoad, fetch);
    console.log(payload);
  }
}

function* rootSaga() {
  yield all([fork(watchNav)]);
}

export default rootSaga;
