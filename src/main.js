import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import './registerServiceWorker'

Vue.config.productionTip =  false
// 注册一个事件总线，一个类似vuex的东西
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
