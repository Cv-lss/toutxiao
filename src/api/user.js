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

/**
 * 获取用户个人资料
 * @returns Promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 *上传头像的接口
 * @param {*} file 图片的file对象
 * @returns Promise
 */
// 如果传的是对象, axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formDate表单, 那么axios会将表单提交给后端, 并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(form-data)
// const fm = new FormData()
// fm.append(表单的name,表单项)
export const upDataAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: 'v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

/**
 * 修改昵称性别和生日
 * @param {*} data 修改的哪一项数据
 * @returns Promise
 */
// 修改资料/v1_0/user/profile
export const updataInfo = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

/**
 * 获取用户的个人的信息
 * @returns Promise
 */
// 获取用户的个人信息接口v1_0/user
export const getPersonalInformation = () => {
  return request({
    url: 'v1_0/user',
    method: 'get'
  })
}
