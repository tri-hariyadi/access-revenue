import { types } from '../types';

const initialState = {
  getKasLoading: false,
  getKasData: false,
  getKasError: false,
}

const KasReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.KAS_RESET_REDUCER:
      return {
        ...initialState
      }
    case types.GET_ALL_KAS:
      return {
        ...state,
        getKasLoading: action.payload.loading,
        getKasData: action.payload.data,
        getKasError: action.payload.errorMessage,
      }

    default:
      return state;
  }
}

export default KasReducer;
