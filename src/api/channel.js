import request from '@/utils/request'
import storage from '@/utils/storage'
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取全部频道信息
 * @returns Promise
 */
export const getAllChannelsInfo = () =>
  request({ url: '/v1_0/channels', method: 'get' })

/**
 * 删除用户点击的频道
 * @param {*} id 用户点击的id
 * @returns Promise
 */
export const delChannel = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 * 添加点击的频道
 * @param {*} id 频道的id
 * @param {*} seq 索引
 * @returns Promise
 */
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    data: [{ id, seq }]
  })
}

const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'
export const setChannelToLocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannels)
}

export const getChannelByLocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
