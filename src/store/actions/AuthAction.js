import { authHeader, instance, instanceAuth } from '../../configs';
import { types } from '../types';

export const resetAllAuthReducer = () => dispatch => {
  dispatch({
    type: types.RESET_ALL_AUTH_REDUCER,
    payload: {
      loading: false,
      data: false,
      errorMessage: false
    }
  })
}

export const loginUser = payload => async dispatch => {
  let response;
  await instance.post('login', payload)
    .then(({ data }) => response = data)
    .catch(err => err.response ? response = err.response : response = err);

  return response;
}

export const refreshToken = () => {
  return instanceAuth.get('refreshtoken', { headers: authHeader() });
}

export const revokeToken = () => {
  instanceAuth.delete('logout', { headers: authHeader() });
}

export const mutationAccount = async payload => {
  let result;
  await instanceAuth.post('payment/mutation', payload, { headers: authHeader() })
    .then(({ data }) => {
      if (data.result && data.status === 200)
        result = data.result.AccountDetailDataSuccess[0];
    }).catch(err => { });
  return result;
}
