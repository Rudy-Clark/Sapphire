import { TOGGLE_SIGN_IN, TOGGLE_SIGN_UP, CLOSE_ALL } from '../actions/modal';

const initialState = {
  signUp: false,
  signIn: false,
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIGN_IN:
      return {
        ...state,
        signIn: !state.signIn,
      }
    case TOGGLE_SIGN_UP:
      return {
        ...state,
        signUp: !state.signUp,
      }
    case CLOSE_ALL:
      return initialState;
    default:
      return state;
  }
}

export default modal;
