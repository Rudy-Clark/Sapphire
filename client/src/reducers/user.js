import { getLocalStorage } from '../api/local-storage';
import { ADD_USER, DEL_USER } from '../actions/constants';

const initialState = {
  name: '',
  role: '',
  token: '',
  ...getLocalStorage(),
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...action.payload };
    case DEL_USER:
      return { name: '', role: '', token: '' };
    default:
      return state;
  }
};

export default user;
