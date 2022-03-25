import request from './request'

// 登录
export function userLogin (payload) {
  return request({
    url: '/login',
    method: 'post',
    data: payload
  })
}
