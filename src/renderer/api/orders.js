import request from '@/utils/request'

export function getList(params, token) {
  return request({
    url: '/orders',
    method: 'get',
    headers: { authorization: token },
    params
  })
}

export function getOrder(id, token) {
  return request({
    url: '/orders/' + id,
    method: 'get',
    headers: { authorization: token }
  })
}
