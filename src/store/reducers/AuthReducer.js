import { types } from '../types';

const initialState = {
  token: false
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return {
        ...state,
        token: action.payload.data
      }

    default:
      return state;
  }
}

export default AuthReducer;
