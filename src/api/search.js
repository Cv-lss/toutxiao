import request from '@/utils/request'

/**
 * 获取搜索建议的接口
 * @param {String} 是参数
 * @returns Priomse
 */
export const getSearchSuggestionsApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
