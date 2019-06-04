import axios from 'axios';

import { getItem } from './local-storage';

export const request = axios.create({
  headers: {
    Authorization: `Bearer ${getItem('token')}`,
  },
});

request.interceptors.response.use(
  response => response.data,
  error => error.response.data,
);
