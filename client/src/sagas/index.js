/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, all, cancel } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { ROUTE_CHANGE, REQUEST, REQUEST_SUCCESS } from '../actions/constants';
import { setReqError, setContent } from '../actions';
import { loadPage } from '../api';

function* execLoad(fetch) {
  if (!fetch) yield cancel();
  yield put({ type: REQUEST });
  try {
    const response = yield call(fetch);
    if (isEmpty(response)) yield put(setReqError('Server Error'));
    yield put(setContent(response));
    yield put({ type: REQUEST_SUCCESS });
  } catch (error) {
    console.error(error);
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
