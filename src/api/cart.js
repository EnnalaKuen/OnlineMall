import request from '@/utils/request'

export const addToCart = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/add',
    method: 'post',

    data: {
      goodsId,
      goodsNum,
      goodsSkuId
    }
  })
}
export const getCartList = () => {
  return request({
    url: '/cart/list'
  })
}
export const changeCount = (goodsId, goodsSkuId, goodsNum) => {
  return request({
    url: '/cart/update',
    method: 'post',
    data: {
      goodsId, goodsNum, goodsSkuId
    }
  })
}
export const deleteCart = (cartIds) => {
  return request({
    url: '/cart/clear',
    method: 'post',
    data: {
      cartIds
    }
  })
}
