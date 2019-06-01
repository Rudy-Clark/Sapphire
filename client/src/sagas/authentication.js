/* eslint-disable no-constant-condition */
import { take, put, call, fork, all } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { SIGN_IN, SIGN_UP, LOGOUT } from '../actions/constants';

function* checkSignIn(data) {
  yield console.log(data);
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

export default function* watchAuth() {
  yield fork(all, [fork(watchSignUp), fork(watchSignIn)]);
}
