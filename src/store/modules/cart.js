import { getCartList, changeCount, deleteCart } from '@/api/cart'

export default {
  namespaced: true,
  state: {
    cartList: []
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const index = state.cartList.findIndex(item => item.goods_id === goodsId)
      state.cartList[index].isChecked = !state.cartList[index].isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    }
  },
  actions: {
    async getCartList (context) {
      const res = await getCartList()
      console.log(res)
      const data = res.data.list
      // 后台返回的数据不包括复选框的选中状态
      data.forEach(element => {
        element.isChecked = true
      })
      context.commit('setCartList', data)
    },
    async changeCount (context, obj) {
      const res = await changeCount(obj.goodsId, obj.goodsSkuId, obj.goodsNum)
      // 修改完成后重新获取数据
      context.dispatch('getCartList')
      console.log(res)
    },
    async deleteCart (context) {
      // 提取选中商品的ID数组
      const deleteIds = context.getters.checkedList.map(item => item.id)

      // 如果没有选中商品，则不执行删除操作
      if (deleteIds.length === 0) return

      try {
        // 调用删除购物车接口
        await deleteCart(deleteIds)
        // 重新获取购物车列表，刷新数据
        context.dispatch('getCartList')
      } catch (error) {
        console.error('删除购物车商品失败:', error)
      }
    }
  },
  getters: {
    // 选中的商品
    checkedList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 求所有商品数量的和
    carTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总数
    checkedTotal (state, getters) {
      return getters.checkedList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价格
    checkedTotalPrice (state, getters) {
      return getters.checkedList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    isAllChecked (state, getters) {
      return getters.checkedList.length === state.cartList.length
    }
  }
}
