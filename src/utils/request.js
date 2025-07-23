/* 封装axios用于发送请求 */
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store' // 直接导入 store

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开始请求的时候开启loading
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })

  // 获取 token (直接从导入的 store 中获取)
  const token = store.getters.token

  // 如果有 token，添加到请求头
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data
  // 如果状态码不是200，返回错误信息
  if (res.status !== 200) {
    // 清除loading
    Toast.clear()
    return Promise.reject(res.message)
  }
  // 请求完成之后就关闭loading
  Toast.clear()
  return response.data
}, function (error) {
  // 对响应错误做点什么
  // 清除loading
  Toast.clear()
  return Promise.reject(error)
})

export default request
