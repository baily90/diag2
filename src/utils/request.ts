import axios from 'axios';
import { message } from 'antd';
import { tokenStorage } from '@/utils/storage';

const request = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    osType: 105,
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${tokenStorage.getItem('token')}`;
    return config;
  },
  (err) => Promise.reject(err),
);

// 响应拦截器
request.interceptors.response.use(
  ({ data }) => {
    const { code, msg } = data;
    if ([0, 200].includes(code)) {
      return data;
    } if ([400, 40001, 105001002].includes(code)) {
      // token失效
      tokenStorage.clear();
      window.location.href = '/user/login';
      return null;
    } if ([401000000, 403000000].includes(code)) {
      window.location.href = '/';
      return null;
    }
    message.error(msg);
    return data;
  },
  (err) => {
    if (err.response && err.response.statusText) {
      const msg = err.response.data;
      message.error(msg);
    } else {
      message.error(err);
    }
    return Promise.reject(err);
  },
);

export default request;
