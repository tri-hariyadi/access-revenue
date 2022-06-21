import { successDispatch } from "../dispatches"
import { types } from "../types"

export const saveMonthlyRevenue = (data, formValues) => (dispatch) => {
  const payload = {
    dataTable: data,
    formValues
  }
  successDispatch(dispatch, types.MOTHLY_REVENUE, payload);
}

export const saveMonthlyJSON = (dataJson) => (dispatch) => {
  successDispatch(dispatch, types.MOTHLY_REVENUE_JSON, dataJson);
}
