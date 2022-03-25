import request from '@/api/production/request'

// export function GetGraForm(data) {
//   return request({
//     url: 'graReportForm/getData',
//     method: 'get',
//     data
//   })
// }

export function GetGraForm(data) {
  return request({
    url: '/graReport/getNowData',
    method: 'get',
    data
  })
}