import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//安装插件
Vue.use(Vuex);

const state =  {
  cartList: []
};
//创建一个仓库
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store;
