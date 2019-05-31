import { REQUEST_ERROR, SET_PAGE } from './constants';

export const setReqError = error => ({
  type: REQUEST_ERROR,
  payload: error,
});

export const setContent = payload => ({
  type: SET_PAGE,
  payload,
});
