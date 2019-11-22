<template>
  <!-- 个人感觉这个组件只对此次项目有关 -->
  <!-- 给class是因为这个组件并不是唯一的,在下面也会用到 -->
  <div class="nav-bar">
    <div class="left">
      <!-- 因为插槽被替换时有可能样式被替换掉,所以需要一个div进行包裹 -->
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar"
};
</script>
<style scoped>
/* 把组件的公共样式写在这里 */
/* flex布局后面再去学习 */
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1)
 }
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>