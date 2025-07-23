<template>
  <div class="login">
    <van-nav-bar title="用户登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" v-model="mobile" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input class="inp" v-model="picCode" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="smsCode">
          <button @click="getSmsCode">{{ seconds === totalSeconds ? '获取验证码' : seconds + '秒后重新获取' }}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>

import { getPicCode, getSmsCode, login } from '@/api/login.js'

export default {
  name: 'LoginPage',
  data () {
    return {
      mobile: '',
      picCode: '',
      picKey: '',
      picUrl: '',
      totalSeconds: 30,
      seconds: 30,
      timser: null,
      smsCode: ''

    }
  },
  // 页面加载时，获取图形验证码
  created () {
    this.getPicCode()
  },
  // 离开页面时，清除定时器
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    async getPicCode () {
      // 调用api中的getPicCode方法
      const res = await getPicCode()
      console.log(res)
      this.picUrl = res.data.base64
      this.picKey = res.data.key
    },
    // 校验手机号和验证码格式
    checkPhoneAndPicCode () {
      // 如果手机号为空，返回false
      if (!this.mobile) {
        this.$toast('请输入手机号')
        return false
      }
      // 如果手机号不是11位数字，返回false
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      // 如果验证码为空，返回false
      if (!this.picCode) {
        this.$toast('请输入验证码')
        return false
      }
      // 如果验证码不为4位字符，返回false
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      // 如果手机号和验证码格式都正确，返回true
      return true
    },
    async getSmsCode () {
      // 如果定时器不存在，并且当前秒数等于总秒数
      if (!this.timer && this.seconds === this.totalSeconds && this.checkPhoneAndPicCode()) {
        // 调用api中的getSmsCode方法
        const res = await getSmsCode(this.mobile, this.picCode, this.picKey)
        console.log(res)
        this.$toast('获取验证码成功')
        this.timer = setInterval(() => {
          this.seconds--
          // 如果当前秒数小于0，清除定时器，并且重置秒数和定时器
          if (this.seconds < 0) {
            clearInterval(this.timer)
            this.seconds = this.totalSeconds
            this.timer = null
          }
        }, 1000)
      }
    },
    async login () {
      if (!this.checkPhoneAndPicCode()) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      // 调用api中的login方法
      const res = await login(this.mobile, this.smsCode)
      console.log(res)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast.success('登录成功')

      // 检查url中是否包含返回地址backUrl
      const url = this.$route.query.backUrl || '/'
      // 如果没有就跳转到首页
      setTimeout(() => {
        this.$router.replace(url)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
