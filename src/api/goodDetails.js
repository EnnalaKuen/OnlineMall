import request from '@/utils/request'
export const getGoodDetails = (id) => {
  return request({
    url: `/goods/detail&goodsId=${id}`,
    method: 'GET'
  })
}
export const getComments = (id, num) => {
  return request({
    url: `/comment/listRows&goodsId=${id}&limit=${num}`,
    method: 'get'
  })
}
