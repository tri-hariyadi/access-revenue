import { combineReducers } from 'redux';
import { types } from '../types';

const initialState = {
  dataTable: false,
  formValues: false,
  dataJson: [],
}

const MonthlyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MOTHLY_REVENUE:
      return {
        ...state,
        dataTable: action.payload.data.dataTable,
        formValues: action.payload.data.formValues,
      }
    case types.MOTHLY_REVENUE_JSON:
      return {
        ...state,
        dataJson: action.payload.data,
      }

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  MonthlyReducer
});

export default rootReducer;
