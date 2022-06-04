import { authHeader, errHandle, instanceAuth } from '../../configs';
import { loadingDispatch, successDispatch, errorDispatch } from '../dispatches';
import { types } from '../types';

export const kasResetAllReducer = () => dispatch => {
  dispatch({
    type: types.KAS_RESET_REDUCER
  })
}

export const getKasTransaction = payload => async dispatch => {
  loadingDispatch(dispatch, types.GET_ALL_KAS);
  instanceAuth.post('kas/getKasTransaction', payload, { headers: authHeader() })
    .then(({ data }) => {
      if (data.result && data.status === 200)
        successDispatch(dispatch, types.GET_ALL_KAS, data.result);
      else errorDispatch(dispatch, types.GET_ALL_KAS, data.message);
    }).catch(err => errorDispatch(dispatch, types.GET_ALL_KAS, errHandle(err)));
}

export const verifyKasTransaction = payload => async dispatch => {
  let result;
  await instanceAuth.post('kas/kasVerify', payload, { headers: authHeader() })
    .then(({ data }) => { if (data.result && data.status === 200) result = data.message; })
    .catch(() => { })
  return result;
}

export const deleteKasTransaction = payload => async dispatch => {
  let result;
  await instanceAuth.post('kas/deleteKasTransaction', payload, { headers: authHeader() })
    .then(({ data }) => { if (data.result && data.status === 200) result = data.message; })
    .catch(() => { })
  return result;
}
