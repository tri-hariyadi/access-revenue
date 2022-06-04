import { types } from '../types';

const initialState = {
  getAllAttendanceTagLoading: false,
  getAllAttendanceTagData: false,
  getAllAttendanceTagError: false,

  deleteAttendanceTagLoading: false,
  deleteAttendanceTagData: false,
  deleteAttendanceTagError: false,

  addAttendanceTagLoading: false,
  addAttendanceTagData: false,
  addAttendanceTagError: false,
}

const AttendanceTagReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_ATTENDANCE_TAG:
      return {
        ...state,
        getAllAttendanceTagLoading: action.payload.loading,
        getAllAttendanceTagData: action.payload.data,
        getAllAttendanceTagError: action.payload.errorMessage,
      }
    case types.DELETE_ATTENDANCE_TAG:
      return {
        ...state,
        deleteAttendanceTagLoading: action.payload.loading,
        deleteAttendanceTagData: action.payload.data,
        deleteAttendanceTagError: action.payload.errorMessage,
      }
    case types.ADD_ATTENDANCE_TAG:
      return {
        ...state,
        addAttendanceTagLoading: action.payload.loading,
        addAttendanceTagData: action.payload.data,
        addAttendanceTagError: action.payload.errorMessage,
      }

    default:
      return state;
  }
}

export default AttendanceTagReducer;
