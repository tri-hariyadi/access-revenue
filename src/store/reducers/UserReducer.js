import { types } from '../types';

const initialState = {
  getAllUserLoading: false,
  getAllUserData: false,
  getAllUserError: false,

  deleteUserLoading: false,
  deleteUserData: false,
  deleteUserError: false,

  registerUserLoading: false,
  registerUserData: false,
  registerUserError: false,
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_ALL_USER_REDUCER:
      return {
        ...initialState
      }
    case types.GET_ALL_USER:
      return {
        ...state,
        getAllUserLoading: action.payload.loading,
        getAllUserData: action.payload.data,
        getAllUserError: action.payload.errorMessage,
      }
    case types.DELETE_USER:
      return {
        ...state,
        deleteUserLoading: action.payload.loading,
        deleteUserData: action.payload.data,
        deleteUserError: action.payload.errorMessage,
      }
    case types.REGISTER_USER:
      return {
        ...state,
        registerUserLoading: action.payload.loading,
        registerUserData: action.payload.data,
        registerUserError: action.payload.errorMessage,
      }

    default:
      return state;
  }
}

export default UserReducer;
