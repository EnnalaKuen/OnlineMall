import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    userInfo: getInfo()
  },
  getters: {
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setInfo(userInfo)
    }
  },
  actions: {
    logout (context) {
      // 个人信息要重置
      context.commit('setUserInfo', {})

      // 购物车的信息要重置(跨组件通信)
      // 语法格式：context.commit('模块名/mutation', 数据, { root: true })
      // 跨组件通信：在vuex中，如果需要跨组件通信，需要使用{ root: true }
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
