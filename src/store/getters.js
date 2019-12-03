const getters = {
  cartLength(state) {
    return state.cartList.length
  },
  getCartList(state) {
    return state.cartList
  },
  getTotalPrice(state) {
    return '￥'+state.cartList.filter(item => item.checked).reduce((preValue, item) => {
      return preValue + item.price * item.count
    }, 0).toFixed(2)
  },
  //选中的商品数量
  getCheckedLength(state){
    return state.cartList.filter(item => item.checked).reduce((preValue,item) => {
      return preValue + item.count
    },0)
  }
}
//可以通过映射把这个弄到组件
export default getters