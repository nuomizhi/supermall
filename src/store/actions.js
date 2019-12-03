const actions = {
  addCart(context, payLoad) {
    // console.log(payLoad);
    //其实可以有很多方法
    // let oldProduct = context.state.cartList.find(item => item.iid == payLoad.iid)
    // if (oldProduct) {
    //   //说明有重复的值
    //   context.commit('addCount', oldProduct)
    // } else {
    //   context.commit('addToCart', payLoad)
    // }

    //return Promise的做法
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid == payLoad.iid)
      if (oldProduct) {
        //说明有重复的值
        context.commit('addCount', oldProduct);
        resolve('当前的商品数量加1')
      } else {
        context.commit('addToCart', payLoad);
        resolve('当前商品加1')
      }
    })
  }
};

export default actions;