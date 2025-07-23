import request from '@/utils/request'
export const getCategoryData = () => {
  return request({
    url: '/category/list',
    method: 'GET'
  })
}
