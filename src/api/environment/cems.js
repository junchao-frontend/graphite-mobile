import request from './request.js'
// 设备状态
export function getCemsLabel (params) {
    return request({
      url: '/getDeviceByType',
      method: 'get',
      params
    })
  }
  // 数据趋势
  export function getMainCems (params) {
    return request({
      url: '/dashboard/CEMSCurve',
      method: 'get',
      params: params
    })
  }
  // 数据标签
  export function getDeviceRealData (params) {
    return request({
      url: '/getDeviceRealData',
      method: 'get',
      params: params
    })
  }
  // 最近十分钟数据
  export function getDevice10Data (params) {
    return request({
      url: '/getDevice10Data',
      method: 'get',
      params: params
    })
  }