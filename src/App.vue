<template>
  <div id="app">
    <!-- 在配置好各种路径后，在此处开始引入 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
    <div id="test"></div>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";

export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style scoped>
/* css后缀不能省略 */
@import "assets/css/base.css";
</style>>

