import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8086/',
  timeout: 8000
});

instance.interceptors.request.use(function (config) {
  return config;
});

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    console.log(response);
    return response.data;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error.message);
  }
);

export default instance;
