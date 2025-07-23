export default {
  // 此处编写的是vue组件实例的 配置项，通过一定的语法可以直接混入到组件内部
  // data methods computed都可以混入，如果和组件内有同名的元素，则组件内的元素优先
  methods: {

    /**
     * 这个方法是用来判断，是否需要弹出弹出框的，如果用户已经登录，就不需要弹出，返回false，如果用户没有登录，就需要弹出弹出框
     * @returns
     *  false 已经登录
     *  true 没有登录，弹出弹出框
     */
    showDialogConfirm () {
      if (!this.$store.getters.token) {
        // 弹出确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '你需要先登录',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          // replace相当于替换当前这个页面，这样就不会影响router.back()跳转回本来的上一页
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {
          // 用户点击取消
        })
        return true
      }
      return false
    }

  }
}
