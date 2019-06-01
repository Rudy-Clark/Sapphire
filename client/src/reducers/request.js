import { REQUEST, REQUEST_SUCCESS, REQUEST_ERROR } from '../actions/constants';

const initialState = {
  loading: false,
  error: null,
};

const request = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return { ...initialState, loading: true };
    case REQUEST_SUCCESS:
      return { loading: false, error: null };
    case REQUEST_ERROR:
      return { loading: false, error: true, ...action.payload };
    default:
      return state;
  }
};

export default request;
