import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/auth'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN'))  storage.get('HEIMA_TOUTIAO_TOKEN')

    tokenObj: getToken() || {},

    // 搜索关键字
    str: []
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, paylod) {
      state.tokenObj = paylod
      // vuex不是持久化的数据 一刷新页面数据就没有了 需要在本地存储上保存一下
      // localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(paylod))
      // storage.set('HEIMA_TOUTIAO_TOKEN', paylod)
      setToken(paylod)
    },

    // 关键字
    RESULTKEYWORDS(state, str) {
      state.str = str
    }
  },
  actions: {},
  modules: {}
})
