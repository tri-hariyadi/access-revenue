import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import AbsentReducer from './AbsentReducer';
import ReimbursementReducer from './ReimbursementReducer';
import AttendanceTagReducer from './AttendanceTagReducer';
import KasReducer from './KasReducer';

const rootReducer = combineReducers({
  AuthReducer,
  UserReducer,
  AbsentReducer,
  ReimbursementReducer,
  AttendanceTagReducer,
  KasReducer
});

export default rootReducer;
