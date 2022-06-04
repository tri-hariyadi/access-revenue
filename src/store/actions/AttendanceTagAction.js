import { types } from '../types';
import { instance, errHandle } from '../../configs';
import { errorDispatch, loadingDispatch, successDispatch } from '../dispatches';

export const getAllAttendanceTag = () => dispatch => {
  loadingDispatch(dispatch, types.GET_ALL_ATTENDANCE_TAG);
  instance.get('attendacetag/getAll').then(({ data }) => {
    if (data.result && data.status === 200) successDispatch(dispatch, types.GET_ALL_ATTENDANCE_TAG, data.result);
    else errorDispatch(dispatch, types.GET_ALL_ATTENDANCE_TAG, data.message);
  }).catch(err => errorDispatch(dispatch, types.GET_ALL_ATTENDANCE_TAG, errHandle(err)));
}

export const deleteAttendanceTag = payload => async dispatch => {
  let result;
  await instance.post('attendacetag/delete', payload)
    .then(({ data }) => { if (data.result && data.status === 200) result = data.message; });
  return result;
}

export const addAttendanceTag = payload => async dispatch => {
  let result;
  await instance.post('attendacetag/add', payload)
    .then(({ data }) => { if (data.result && data.status === 200) result = data.message; });
  return result;
}
