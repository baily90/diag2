import axios from 'axios';
import { notification } from 'antd';
import { tokenStorage } from '@/utils/storage';

const request = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
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
    const { code } = data;
    if ([400, 40001, 401000000, 403000000].includes(code)) {
      // token失效
      tokenStorage.clear();
      window.location.href = '/user/login';
      return null;
    }
    return data;
  },
  (err) => {
    if (err.response && err.response.data) {
      const code = err.response.status;
      const msg = err.response.data.message;
      notification.error({
        message: `请求错误 ${code}`,
        description: msg,
      });
    } else {
      notification.error({
        message: '接口异常',
        description: err,
      });
    }
    return Promise.reject(err);
  },
);

export default request;
