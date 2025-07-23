import request from '@/utils/request'

export const getHomeData = () => {
  return request({
    url: '/page/detail',
    method: 'GET',
    headers: {
      platform: 'h5'
    }
  })
}
