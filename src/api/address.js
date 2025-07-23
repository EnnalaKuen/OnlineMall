import request from '@/utils/request'
export const addAddress = () => {
  return request({
    url: '/address/add',
    method: 'post',
    data: {
      form: {
        name: 'Ennaku',
        phone: '18999292929',
        region: [
          {
            value: 782,
            label: '上海'
          },
          {
            value: 783,
            label: '上海市'
          },
          {
            value: 785,
            label: '徐汇区'
          }
        ],
        detail: '北京路1号楼8888室'
      }
    }
  })
}
export const getAddress = () => {
  return request({
    url: '/address/list',
    method: 'get'
  })
}
