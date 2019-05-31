import { SET_PAGE } from '../actions/constants';

const initialState = {
  name: null,
  title: null,
  subtitle: null,
  wallpaper: '',
  posts: [],
};

const page = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default page;
