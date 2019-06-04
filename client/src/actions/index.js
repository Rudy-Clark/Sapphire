import {
  REQUEST_ERROR,
  SIGN_IN,
  SIGN_UP,
  ADD_USER,
  DEL_USER,
  SET_LOGIN_ERROR,
  SET_REG_ERROR,
} from './constants';

export const setReqError = error => ({
  type: REQUEST_ERROR,
  payload: error,
});

export const signIn = data => ({
  type: SIGN_IN,
  data,
});

export const signUp = data => ({
  type: SIGN_UP,
  data,
});

export const addUser = payload => ({
  type: ADD_USER,
  payload,
});

export const delUser = () => ({
  type: DEL_USER,
});

export const setLoginError = payload => ({
  type: SET_LOGIN_ERROR,
  payload,
});

export const setRegError = payload => ({
  type: SET_REG_ERROR,
  payload,
});
