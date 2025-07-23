import request from '@/utils/request'
// 获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码
export const getSmsCode = (mobile, captchaCode, captchaKey) => {
  return request({
    url: '/captcha/sendSmsCaptcha',
    method: 'POST',
    headers: {
      platform: 'H5',
      'Content-Type': 'application/json'
    },
    data: {
      form: {
        mobile,
        captchaCode,
        captchaKey
      }
    }
  })
}
// 登录
export const login = (mobile, smsCode) => {
  return request({
    url: '/passport/login',
    method: 'POST',
    headers: {
      platform: 'H5',
      'Content-Type': 'application/json'
    },
    data: {
      form: {
        mobile,
        smsCode,
        isParty: false,
        partyData: {}
      }
    }
  })
}
