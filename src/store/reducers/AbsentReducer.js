import { types } from '../types';

const initialState = {
  getAllAbsentLoading: false,
  getAllAbsentData: false,
  getAllAbsentError: false,
}

const AbsentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_ALL_ABSENT_REDUCER:
      return {
        ...initialState
      }
    case types.GET_ALL_ABSENTS:
      return {
        ...state,
        getAllAbsentLoading: action.payload.loading,
        getAllAbsentData: action.payload.data,
        getAllAbsentError: action.payload.errorMessage,
      }

    default:
      return state;
  }
}

export default AbsentReducer;
