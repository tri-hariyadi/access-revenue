import { types } from '../types';
import { instanceAuth, authHeader, errHandle, authHeaderMultiPart } from '../../configs';
import { errorDispatch, loadingDispatch, successDispatch } from '../dispatches';

export const reimbursementResetAllReducer = () => dispatch => {
  dispatch({
    type: types.REIMBURSEMENT_RESET_REDUCER,
    payload: {
      loading: false,
      data: false,
      errorMessage: false
    }
  })
}

export const getAllReimbursement = payload => dispatch => {
  loadingDispatch(dispatch, types.GET_ALL_REIMBURSEMENT);
  instanceAuth.post('reimbursement/getall', payload, { headers: authHeader() })
    .then(({ data }) => {
      if (data.result && data.status === 200) successDispatch(dispatch, types.GET_ALL_REIMBURSEMENT, data.result);
      else errorDispatch(dispatch, types.GET_ALL_REIMBURSEMENT, data.message);
    })
    .catch(err => errorDispatch(dispatch, types.GET_ALL_REIMBURSEMENT, errHandle(err)));
}

export const getReimbursementById = payload => dispatch => {
  loadingDispatch(dispatch, types.GET_BYID_REIMBURSEMENT);
  instanceAuth.post('reimbursement/getbyid', payload, { headers: authHeader() })
    .then(({ data }) => {
      if (data.result && data.status === 200) successDispatch(dispatch, types.GET_BYID_REIMBURSEMENT, data.result);
      else errorDispatch(dispatch, types.GET_BYID_REIMBURSEMENT, data.message);
    })
    .catch(err => errorDispatch(dispatch, types.GET_BYID_REIMBURSEMENT, errHandle(err)));
}

export const payReimbursement = payload => async dispatch => {
  let result
  await instanceAuth.post('payment/payout', payload, { headers: authHeader() })
    .then(({ data }) => {
      if (data.result && data.status === 200) result = data.result;
    })
    .catch(err => result = errHandle(err));
  return result;
}

export const updateReimbursement = payload => async dispatch => {
  let result;
  await instanceAuth.post('reimbursement/update', payload, { headers: authHeader() })
    .then(({ data }) => { if (data.result && data.status === 200) result = data.message; });
  return result;
}

export const deleteReimbursement = payload => async dispatch => {
  let result;
  await instanceAuth.post('reimbursement/delete', payload, { headers: authHeader() })
    .then(({ data }) => { if (data.result && data.status === 200) result = data.message });
  return result;
}

export const getReimbursementsTemp = async payload => {
  let result;
  await instanceAuth.post('reimbursement-temp/getall', payload, { headers: authHeader() })
    .then(({ data }) => { if (data.result && data.status === 200) result = data.result });
  return result;
}

export const deleteReimbursementsTemp = async Ids => {
  let result;
  const payload = new FormData();
  payload.append('reimbursementsId', JSON.stringify(Ids));
  await instanceAuth.post('reimbursement-temp/delete', payload, { headers: authHeaderMultiPart() })
    .then(({ data }) => { if (data.result && data.status === 200) result = data.message });
  return result;
}
