<template>
  <div>
     <!-- 里面放了一个插槽 -->
      <!-- 自定义颜色 -->
      <tab-bar>
      <tab-bar-item path="/home" activeColor="deeppink">
        <!-- 直接写assets是因为配置了别名,而且在html部分需要前面加上~ -->
        <img src="~assets/img/tabBar/home.svg" alt slot="item-icon" />
        <img src="~assets/img/tabBar/home_active.svg" alt slot="item-icon-active" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="~assets/img/tabBar/category.svg" alt slot="item-icon" />
        <img src="~assets/img/tabBar/category_active.svg" alt slot="item-icon-active" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img src="~assets/img/tabBar/cart.svg" alt slot="item-icon" />
        <img src="~assets/img/tabBar/cart_active.svg" alt slot="item-icon-active" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img src="~assets/img/tabBar/profile.svg" alt slot="item-icon" />
        <img src="~assets/img/tabBar/profile_active.svg" alt slot="item-icon-active" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
      </tab-bar>
  </div>
</template>
<script>
import TabBar from "components/common/tabBar/TabBar";
import TabBarItem from "components/common/tabBar/TabBarItem";

export default {
  name:'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>