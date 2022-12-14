import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入字体图标
import '@/assets/fonts/iconfont.css'
// 引入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入移动端适配 rem
import 'amfe-flexible/index.min.js'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,

  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线
  }
}).$mount('#app')
