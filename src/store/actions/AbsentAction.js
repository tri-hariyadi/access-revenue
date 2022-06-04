import { authHeader, errHandle, instanceAuth } from '../../configs';
import { loadingDispatch, successDispatch, errorDispatch } from '../dispatches';
import { types } from '../types';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const resetAllAbsentReducer = () => dispatch => {
  dispatch({
    type: types.RESET_ALL_ABSENT_REDUCER,
    payload: {
      loading: false,
      data: false,
      errorMessage: false
    }
  })
}

export const getAllAbsents = payload => dispatch => {
  loadingDispatch(dispatch, types.GET_ALL_ABSENTS);
  instanceAuth.post('absent/getAbsents', payload, { headers: authHeader() }).then(({ data }) => {
    if (data.result && data.status === 200) successDispatch(dispatch, types.GET_ALL_ABSENTS, data.result);
    else errorDispatch(dispatch, types.GET_ALL_ABSENTS, data.message);
  }).catch(err => errorDispatch(dispatch, types.GET_ALL_ABSENTS, errHandle(err)));
}

export const getDataAbsentUsers = () => async dispatch => {
  const response = await instanceAuth.get('absent/getataabsentusers', { headers: authHeader() }).then(({ data }) => {
    if (data.result && data.status === 200) return data.result;
    else {
      toast.error(data.message);
      return null;
    }
  }).catch(err => {
    toast.error(errHandle(err));
    return null;
  });
  return response;
}
