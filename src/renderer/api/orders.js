import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/orders',
    method: 'get',
    params
  })
}

export function getOrder(id) {
  console.log('getOrder', id)
  return request({
    url: '/orders/' + id,
    method: 'get'
  })
}
