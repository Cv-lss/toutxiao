import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入字体图标
import '@/assets/fonts/iconfont.css'
//引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//引入移动端适配 rem 
import 'amfe-flexible/index.min.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
