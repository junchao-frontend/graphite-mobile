import request from './request.js'
//
export function hbLogin (payload) {
  return request({
    url: 'login',
    method: 'post',
    data: payload
  })
}
