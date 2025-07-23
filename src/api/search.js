import request from '@/utils/request'

export const getSearchList = (goodsName, categoryId) => {
  return request({
    url: '/goods/list',
    params: {
      goodsName,
      categoryId
    }
  })
}
