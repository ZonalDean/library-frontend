import axios from 'axios';
import { getUserAccessToken } from '../services/localStorage';
import { API_ENDPOINT_URL } from './env';

axios.defaults.baseURL = API_ENDPOINT_URL;

axios.interceptors.request.use(
  config => {
    const token = getUserAccessToken();
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  err => Promise.reject(err)
);

export default axios;
