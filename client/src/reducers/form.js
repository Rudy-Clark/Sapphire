import {
  SET_LOGIN_ERROR,
  RESET_ERRORS,
  FORM_REQUEST,
  FORM_REQUEST_END,
} from '../actions/constants';

const initialState = {
  login: {
    msg: '',
  },
  reg: {
    username: '',
    email: '',
  },
  loading: false,
};

const formErrors = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_ERROR:
      // eslint-disable-next-line no-return-assign
      return { ...state, login: { ...action.payload } };
    case RESET_ERRORS:
      return { ...initialState };
    case FORM_REQUEST:
      return { ...state, loading: true };
    case FORM_REQUEST_END:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default formErrors;
