import axios from 'axios';
import swal from 'sweetalert';
import { refreshToken } from '../store';
import { API_HEADERS, API_TIMEOUT } from './constants';

export const instanceAuth = axios.create({
  baseURL: process.env.REACT_APP_API_URL2,
  timeout: API_TIMEOUT,
  validateStatus: () => true
});

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL2,
  headers: API_HEADERS,
  timeout: API_TIMEOUT,
  validateStatus: () => true
});

let isRefreshing = false;
let failedQueue = [];
let failedRefreshToken = true;


const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

instanceAuth.interceptors.response.use(
  response => {
    const originalRequest = response.config;
    const status = response.status;
    if ((status === 401 || status === 403) && !originalRequest._retry && !(response.config.url.includes('refreshtoken'))) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return instanceAuth(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        refreshToken()
          .then(({ data }) => {
            if (!data.result || data.status !== 200) {
              processQueue('error', null);
              reject();
            } else {
              const payload = window.localStorage.getItem('accessToken');
              payload ? window.localStorage.setItem('accessToken', data.result.newAccessToken) : window.sessionStorage.setItem('accessToken', data.result.newAccessToken);
              instanceAuth.defaults.headers.common['Authorization'] = `Bearer ${data.result.newAccessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${data.result.newAccessToken}`;
              processQueue(null, data.result.newAccessToken);
              resolve(instanceAuth(originalRequest));
            }
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => { isRefreshing = false });
      }).catch((err) => {
        if (failedRefreshToken) {
          swal({
            title: 'Error',
            text: 'Session anda telah berakhir, silahkan login ulang',
            icon: 'error',
            closeOnClickOutside: false
          }).then(willDelete => {
            if (willDelete) {
              window.localStorage.removeItem('accessToken');
              window.sessionStorage.removeItem('accessToken');
              window.location.replace('/login');
            }
          });
        }
        failedRefreshToken = false;
      })
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;
    if ((status === 401 || status === 403) && !originalRequest._retry && !(error.config.url.includes('refreshtoken'))) {
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return await instanceAuth(originalRequest);
        } catch (err) {
          return await Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        return new Promise((resolve_1, reject_1) => {
          refreshToken()
            .then(({ data }) => {
              if (!data.result || data.status !== 200) {
                processQueue('error', null);
                reject_1();
              } else {
                const payload = window.localStorage.getItem('accessToken');
                payload ? window.localStorage.setItem('accessToken', data.result.newAccessToken) : window.sessionStorage.setItem('accessToken', data.result.newAccessToken);
                instanceAuth.defaults.headers.common['Authorization'] = `Bearer ${data.result.newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.result.newAccessToken}`;
                processQueue(null, data.result.newAccessToken);
                resolve_1(instanceAuth(originalRequest));
              }
            })
            .catch((err_1) => {
              processQueue(err_1, null);
              reject_1(err_1);
            })
            .finally(() => { isRefreshing = false; });
        });
      } catch (err_2) {
        if (failedRefreshToken) {
          swal({
            title: 'Error',
            text: 'Session anda telah berakhir, silahkan login ulang',
            icon: 'error',
            closeOnClickOutside: false
          }).then(willDelete => {
            if (willDelete) {
              window.localStorage.removeItem('accessToken');
              window.sessionStorage.removeItem('accessToken');
              window.location.replace('/login');
            }
          });
        }
        failedRefreshToken = false;
      }
    }
    return Promise.reject(error);
  }
)
