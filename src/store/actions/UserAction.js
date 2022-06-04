import { authHeader, authHeaderMultiPart, errHandle, instance, instanceAuth } from '../../configs';
import { loadingDispatch, successDispatch, errorDispatch } from '../dispatches';
import { types } from '../types';

export const resetAllUserReducer = () => dispatch => {
  dispatch({
    type: types.RESET_ALL_USER_REDUCER,
    payload: {
      loading: false,
      data: false,
      errorMessage: false
    }
  })
}

export const getAllUser = (payload, param) => dispatch => {
  loadingDispatch(dispatch, types.GET_ALL_USER);
  instanceAuth.post('getAllUsers', payload, { headers: authHeader() }).then(({ data }) => {
    if (data.result && data.status === 200)
      if (param)
        successDispatch(dispatch, types.GET_ALL_USER, data.result);
      else successDispatch(dispatch, types.GET_ALL_USER, data.result.map(item => (
        { value: item._id, label: `${item.username.charAt(0).toUpperCase()}${item.username.slice(1)} - ${item.nik}` }
      )));
    else errorDispatch(dispatch, types.GET_ALL_USER, data.message);
  }).catch(err => errorDispatch(dispatch, types.GET_ALL_USER, errHandle(err)));
}

export const deleteUser = usersId => dispatch => {
  loadingDispatch(dispatch, types.DELETE_USER);
  const payload = new FormData();
  payload.append('usersId', JSON.stringify(usersId));
  instanceAuth.post('deleteuser', payload, { headers: authHeaderMultiPart() })
    .then(({ data }) => {
      if (data.result && data.status === 200)
        successDispatch(dispatch, types.DELETE_USER, data.message);
      else errorDispatch(dispatch, types.DELETE_USER, data.message);
    }).catch(err => errorDispatch(dispatch, types.DELETE_USER, errHandle(err)));
}

export const registerUser = payload => dispatch => {
  loadingDispatch(dispatch, types.REGISTER_USER);
  instance.post('register', payload).then(({ data }) => {
    if (data.result && data.status === 200)
      successDispatch(dispatch, types.REGISTER_USER, data.result);
    else errorDispatch(dispatch, types.REGISTER_USER, data.message);
  }).catch(err => errorDispatch(dispatch, types.REGISTER_USER, errHandle(err)));
}

export const getRequestUpdateProfile = async (payload) => {
  let result;
  await instanceAuth.post('getallreq-update-profile', payload, { headers: authHeader() })
    .then(({ data }) => {
      if (data.result && data.status === 200) result = data.result;
    }).catch(err => { });
  return result;
}

export const acceptUpdateProfile = async (payload) => {
  let result;
  await instanceAuth.post('accept-update-profile', payload, { headers: authHeader() })
    .then(({ data }) => {
      if (data.result && data.status === 200) result = data.result;
    }).catch(err => { });
  return result;
}

export const rejectUpdateProfile = async (payload) => {
  let result;
  await instanceAuth.post('reject-update-profile', payload, { headers: authHeader() })
    .then(({ data }) => {
      if (data.result && data.status === 200) result = data.result;
    }).catch(err => { });
  return result;
}
