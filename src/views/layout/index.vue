<template>
  <div>
    <router-view />
    <van-tabbar route v-model="active" active-color="red" inactive-color="#000">
      <van-tabbar-item icon="wap-home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="list-switch" to="/layout/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/layout/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/layout/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
