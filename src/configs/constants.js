export const API_TIMEOUT = 15000;
export const API_HEADERS = {
  'Content-type': 'application/json',
  'X-Api-Key': process.env.REACT_APP_API_KEY
}

export const authHeader = () => {
  const accessToken = getUserPayload();
  if (accessToken) {
    return {
      'Content-type': 'application/json',
      'X-Api-Key': process.env.REACT_APP_API_KEY,
      'Authorization': `Bearer ${accessToken}`
    }
  }
  return {}
}

export const authHeaderMultiPart = () => {
  const accessToken = getUserPayload();
  if (accessToken) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'X-Api-Key': process.env.REACT_APP_API_KEY,
      'Authorization': `Bearer ${accessToken}`
    }
  }
  return {}
}

export const getUserPayload = () => {
  const payload1 = window.localStorage.getItem('accessToken');
  const payload2 = window.sessionStorage.getItem('accessToken');
  if (payload1) return (payload1);
  else if (payload2) return (payload2);
  else return null;
}
