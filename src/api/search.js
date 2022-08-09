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

/**
 * 搜索结果
 * @param {*} q 选择的哪一个关键词
 * @returns Promise
 */
// 获取搜索结果 /v1_0/search
export const getSearchResult = (params) => {
  return request({
    url: '/v1_0/search',
    params
  })
}
