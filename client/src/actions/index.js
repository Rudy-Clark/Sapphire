import {
  REQUEST_ERROR,
  SET_PAGE,
  SIGN_IN,
  SIGN_UP,
  ADD_USER,
  DEL_USER,
} from './constants';

export const setReqError = error => ({
  type: REQUEST_ERROR,
  payload: error,
});

export const setContent = payload => ({
  type: SET_PAGE,
  payload,
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
