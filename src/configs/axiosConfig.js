import axios from 'axios';
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
