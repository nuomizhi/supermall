<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="cart-list" ref="cartList" />
    <bottom-nav class="bottom-nav" />
  </div>
</template>
<script>
import NavBar from "components/content/navBar/NavBar";
import CartList from "./childComps/CartList";
import BottomNav from "./childComps/BottomNav";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomNav
  },
  computed: {
    //有两种方法进行vuex计算属性映射，
    // ...mapGetters({
    //   length: 'cartLength'
    // })
    ...mapGetters(["cartLength"])
  },
  activated() {
    //刷新组件,由于每次增加新商品都会增加高度，所以得刷新scroll
    this.$refs.cartList.refresh();
  }
};
</script>
<style scoped>
/* scoped 属性是一个布尔属性。
如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素 */
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 2;
}
.cart-list {
  position: relative;
  z-index: 1;
}
.bottom-nav {
  position: fixed;
  z-index: 2;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>