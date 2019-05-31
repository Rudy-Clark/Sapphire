import { REQUEST_ERROR } from './constants';

export const setReqError = error => ({
  type: REQUEST_ERROR,
  payload: error,
});
