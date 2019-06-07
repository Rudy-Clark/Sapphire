import axios from 'axios';

import { getItem } from './local-storage';

const request = axios.create();

request.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error.response.data),
);

request.interceptors.request.use(config => {
  config.headers.post.Authorization = getItem('token');
  config.headers.get.Authorization = getItem('token');
  return config;
});

export default request;
