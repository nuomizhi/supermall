// 抽离文件加单一职责
const mutations = {
  addCount(state, payLoad) {
    // 先操作再赋值
    payLoad.count++;
  },
  addToCart(state, payLoad) {
    state.cartList.push(payLoad)
  },
  //改变checked状态
  checked(state,payLoad){
    const item = state.cartList.find(item => payLoad == item.iid)
    // console.log(item);
    item.checked = !item.checked
  }
};

export default mutations;