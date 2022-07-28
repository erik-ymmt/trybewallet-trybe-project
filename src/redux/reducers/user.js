import { LOGIN_SUCCESS } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, email } = action;
  switch (type) {
  case LOGIN_SUCCESS:
    return { ...state, email };
  default:
    return state;
  }
};

export default userReducer;
