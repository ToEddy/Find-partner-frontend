import axios from "axios";

const instanceAxios = axios.create({
    baseURL: 'http://localhost:8081/api',
    withCredentials: true,
    timeout: 1000,
});
//instanceAxios.defaults.withCredentials = true;  //设置 axios 请求携带cookie

// 添加请求拦截器
instanceAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instanceAxios.interceptors.response.use(function (response) {
    // 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instanceAxios;
