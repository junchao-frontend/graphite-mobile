import axios from 'axios'

let service = axios.create({
  baseURL: 'http://106.52.170.16:8090/'
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 设置token，Content-Type
    const token = localStorage.getItem('env-token') || ''
    config.headers['token'] = token
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // token失效，重新登录
    // if (res.data.code === 401) {
    //   //  重新登录
    // }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
