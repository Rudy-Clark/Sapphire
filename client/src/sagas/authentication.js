/* eslint-disable no-constant-condition */
import { take, put, call, fork, all } from 'redux-saga/effects';
// import { isEmpty } from 'lodash';

import {
  SIGN_IN,
  SIGN_UP,
  LOGOUT,
  FORM_REQUEST,
  FORM_REQUEST_END,
} from '../actions/constants';
import { setLoginError, setRegError } from '../actions';
import { request } from '../api/request';

function* checkSignIn(data) {
  try {
    yield put({ type: FORM_REQUEST });
    const res = yield call(request.post, '/auth/login', data, {
      errorHandle: false,
    });
  } catch (error) {
    yield put(setLoginError({ msg: error.msg }));
    yield put({ type: FORM_REQUEST_END });
  }
}

function* checkSignUp(data) {
  try {
    yield put({ type: FORM_REQUEST });
    const resp = yield call(request.post, '/auth/reg', data);
  } catch (error) {
    yield put(setRegError(error.errorMsg));
    yield put({ type: FORM_REQUEST_END });
  }
}

function* watchSignIn() {
  while (true) {
    try {
      const { data } = yield take(SIGN_IN);
      yield fork(checkSignIn, data);
    } catch (error) { console.error(error) }
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
