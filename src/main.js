import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import toast from './components/common/toast';
import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload'

//引用后面一般都为小写，因为文件夹里面有index.js,而插件名字一般也小写，除了组件
// import './registerServiceWorker'

Vue.config.productionTip =  false;
// 注册一个事件总线，一个类似vuex的东西
Vue.prototype.$bus = new Vue();

//注册一个toast组件，
Vue.use(toast)

//移动端300延迟
FastClick.attach(document.body)

//图片懒加载,选项有很多
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/loading.png')
  // loading: require('./assets/img/common/loading.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
