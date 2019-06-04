/* eslint-disable no-constant-condition */
import { take, put, call, fork, all, cancel } from 'redux-saga/effects';
// import { isEmpty } from 'lodash';

import {
  SIGN_IN,
  SIGN_UP,
  LOGOUT,
  FORM_REQUEST,
  FORM_REQUEST_END,
} from '../actions/constants';
import { setLoginError } from '../actions';
import { login } from '../api/auth';

function* checkSignIn(data) {
  yield put({ type: FORM_REQUEST });
  const res = yield call(login, data);
  if (res.status === 'error') {
    yield put(setLoginError({ msg: res.msg }));
    yield put({ type: FORM_REQUEST_END });
    yield cancel();
  }
}

function* checkSignUp(data) {
  yield console.log(data);
}

function* watchSignIn() {
  while (true) {
    const { data } = yield take(SIGN_IN);
    yield fork(checkSignIn, data);
  }
}

function* watchSignUp() {
  while (true) {
    const { data } = yield take(SIGN_UP);
    yield fork(checkSignUp, data);
  }
}

function* watchLogout() {
  while (true) {
    yield take(LOGOUT);
  }
}

export default function* watchAuth() {
  yield all([fork(watchSignUp), fork(watchSignIn), fork(watchLogout)]);
}
