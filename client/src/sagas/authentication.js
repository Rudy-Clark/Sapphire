/* eslint-disable no-constant-condition */
import { take, put, call, fork, all, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  SIGN_IN,
  SIGN_UP,
  LOGOUT,
  FORM_REQUEST,
  FORM_REQUEST_END,
  RESET_ERRORS,
  REQUEST,
  REQUEST_SUCCESS,
} from '../actions/constants';
import { setLoginError, setRegError, addUser, delUser } from '../actions';
import { setLocalStorage, clearLocalStorage } from '../api/local-storage';
import request from '../api/request';

function* checkSignIn(data) {
  try {
    yield put({ type: FORM_REQUEST });
    const resp = yield call(request.post, '/auth/login', data);
    const localStorage = yield setLocalStorage(resp);
    yield put(addUser(localStorage));
    yield put({ type: RESET_ERRORS });
    yield put(push(`/${localStorage.role}/`));
    yield put({ type: FORM_REQUEST_END });
  } catch (error) {
    yield put(setLoginError({ msg: error.msg }));
    yield put({ type: FORM_REQUEST_END });
  }
}

function* checkSignUp(data) {
  try {
    yield put({ type: FORM_REQUEST });
    const resp = yield call(request.post, '/auth/reg', data);
    console.log(resp);
    const localStorage = yield setLocalStorage(resp);
    yield put(addUser(localStorage));
    yield put({ type: RESET_ERRORS });
    yield put(push(`/${localStorage.role}/`));
    yield put({ type: FORM_REQUEST_END });
  } catch (error) {
    yield put(setRegError(error.errorMsg));
    yield put({ type: FORM_REQUEST_END });
  }
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

function* logout() {
  yield put({ type: REQUEST });
  try {
    const resp = yield call(request.get, '/auth/status');
    if (resp.status === 'success') {
      yield clearLocalStorage();
      yield put(delUser());
      yield put({ type: REQUEST_SUCCESS });
    }
  } catch (error) {
    console.error(error);
  }
}

function* watchLogout() {
  yield takeLatest(LOGOUT, logout);
}

export default function* watchAuth() {
  yield all([fork(watchSignUp), fork(watchSignIn), fork(watchLogout)]);
}
