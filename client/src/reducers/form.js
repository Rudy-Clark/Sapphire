const initialState = {
  login: {
    email: [],
    password: [],
  },
  reg: {
    username: [],
    email: [],
    password: [],
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
