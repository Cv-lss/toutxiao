// 接口二次封装
import request from '@/utils/request'
/**
 * 登录接口API
 * @param {*} mobile 携带的参数 手机号
 * @param {*} code  携带的参数 验证码
 * @returns 返回的是Promise对象
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 * @param {String} mobile  验证手机号
 * @returns Porimes
 */

export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'get'
  })
}
