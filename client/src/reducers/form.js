const initialState = {
  login: {
    email: '',
  },
  reg: {
    username: '',
    email: '',
  },
};

const formErrors = (state = initialState, action) => {
  switch (action.type) {
    case 'b':
      return state;
    default:
      return state;
  }
};

export default formErrors;
