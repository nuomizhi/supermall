<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>
<script>
// 多个业务之间都能用到，所以放在content
//回到顶部功能在组件内不好实现，所以放在home中
export default {
  name:'BackTop'
}
</script>
<style scoped>
  /* 多个组件引用样式基本都一样 */
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 55px;
    z-index: 11;
  }
  .back-top img {
    width: 44px;
  }
</style>