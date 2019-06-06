import axios from 'axios';

import { getItem } from './local-storage';

export const request = axios.create({
  headers: {
    Authorization: getItem('token'),
  },
  errorHandle: false,
});

request.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error.response.data),
);
