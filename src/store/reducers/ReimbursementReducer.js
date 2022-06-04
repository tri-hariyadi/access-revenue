import { types } from '../types';

const initialState = {
  getAllReimbursementLoading: false,
  getAllReimbursementData: false,
  getAllReimbursementError: false,

  getByIdReimbursementLoading: false,
  getByIdReimbursementData: false,
  getByIdReimbursementError: false,

  payReimbursementLoading: false,
  payReimbursementData: false,
  payReimbursementError: false,
}

const ReimbursementReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REIMBURSEMENT_RESET_REDUCER:
      return { ...initialState }
    case types.GET_ALL_REIMBURSEMENT:
      return {
        ...state,
        getAllReimbursementLoading: action.payload.loading,
        getAllReimbursementData: action.payload.data,
        getAllReimbursementError: action.payload.errorMessage,
      }
    case types.PAY_REIMBURSEMENT:
      return {
        ...state,
        payReimbursementLoading: action.payload.loading,
        payReimbursementData: action.payload.data,
        payReimbursementError: action.payload.errorMessage,
      }
    case types.GET_BYID_REIMBURSEMENT:
      return {
        ...state,
        getByIdReimbursementLoading: action.payload.loading,
        getByIdReimbursementData: action.payload.data,
        getByIdReimbursementError: action.payload.errorMessage,
      }

    default:
      return state;
  }
}

export default ReimbursementReducer;
