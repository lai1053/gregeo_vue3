/** @format */

import axios from 'axios'
import state from '@/store/state'
import { Message } from 'ant-design-vue'
import { createRouter } from 'vue-router'

// 请求头配置
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const storage = window.localStorage

// 声明接口请求地址
axios.defaults.baseURL = process.env.VUE_APP_API_BASE

//拦截器配置
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = storage.token
    //token && (config.headers.Authorization = token);
    token && (config.headers.Authorization = `JWT ${token}`)
    return config
  },
  error => {
    return Promise.error(error)
  },
)

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//   // axios.defaults.baseURL = '/api';
//   console.log(123);
// } else if (process.env.NODE_ENV == 'debug') {
//   // axios.defaults.baseURL = '';
//   console.log(456);
// } else if (process.env.NODE_ENV == 'production') {
//   // axios.defaults.baseURL = 'http://test.xiazq.com/';
//   console.log(789);
// }
// 是否为生产环境
// const isProduction = process.env.NODE_ENV !== 'development'
// if (isProduction) {
//   axios.defaults.baseURL = 'https://api.grewalleco.com/'
// } else {
//   //axios.defaults.baseURL = 'http://192.168.0.118:8000/'
//   //axios.defaults.baseURL = 'http://192.168.1.61:8000/'
//   //axios.defaults.baseURL = 'http://192.168.0.107:80/'
//   axios.defaults.baseURL = 'https://marketing-api-test.grewalleco.com/'
// }

// 请求超时时间
/*axios.defaults.timeout = 10000;
// 响应拦截
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          this.$message.info('登录过期，请重新登录');
          // Message({
          //   message: '登录过期，请重新登录',
          //   duration: 1000,
          //   forbidClick: true
          // });
          // 清除token
          localStorage.removeItem('token');
          store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          this.$message.info('网络请求不存在');
          // Toast({
          //   message: '网络请求不存在',
          //   duration: 1500,
          //   forbidClick: true
          // });
          break;
        // 其他错误，直接抛出错误提示
        default:
          this.$message.info(error.response.data.message);
          // Toast({
          //   message: error.response.data.message,
          //   duration: 1500,
          //   forbidClick: true
          // });
      }
      return Promise.reject(error.response);
    }
  }
);*/
axios.defaults.withCredentials = true
export default function ajax(url = '', data = {}, type = '') {
  return new Promise(function (resolve, reject) {
    let promise
    switch (type) {
      case 'GET':
        promise = axios.get(jointUrl(url, data, type))
        break
      case 'PUT':
        promise = axios.put(url, data)
        break
      case 'PATCH':
        promise = axios.patch(jointUrl(url, data))
        break
      case 'DELETE':
        promise = axios.delete(jointUrl(url, data))
        break
      case 'POST':
        promise = axios.post(url, data)
        break
    }
    /*  if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else if(type === 'POST') {
      // 发送post请求

      promise = axios.post(url, data)

    }else {
      promise = axios[type](url, data)

    }*/

    promise
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const jointUrl = (url, data, type) => {
  // 准备url query参数数据
  let dataStr = '' //数据拼接字符串
  let dataID = '' // 拼接指定ID
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&'
    dataID = data[key]
  })

  if (type) {
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  } else {
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + dataID
    }
  }

  return url
}
