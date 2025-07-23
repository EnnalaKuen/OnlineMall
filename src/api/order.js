import request from '@/utils/request'
// 生成订单信息
export const checkOut = (mode, obj) => {
  return request({
    url: '/checkout/order',
    method: 'get',
    params: {
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      mode,
      payType: 10,
      ...obj
    }
  })
}
/**
 * 提交订单
 * @param {*} mode 提交订单的模式 cart payNow
 * @param {*} obj 提交订单的数据
 * mode : cart => obj { cartIds , remark }
 * mode : payNow => obj { goddsId , goodsNum , goodsSkuId , remark }
 * @returns
 */
export const submitOrder = (mode, obj) => {
  return request({
    url: '/checkout/submit',
    method: 'post',
    data: {
      mode,
      delivery: '10',
      payType: 10,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

// 获取订单列表
export const getMyOrder = (dataType, page) => {
  return request({
    url: '/order/list',
    method: 'get',
    params: {
      dataType,
      page
    }
  })
}

// 取消订单
export const cancelOrder = (orderId) => {
  return request({
    url: '/order/cancel',
    method: 'post',
    data: {
      orderId
    }
  })
}
