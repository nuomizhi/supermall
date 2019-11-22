<template>
  <div id="tab-bar">
    <!-- TabBarItem是不确定的，所以只给一个插槽，而TabBarItem里面的内容是确定的，所以给两个确定的插槽 -->
    <slot>
    </slot> 
  </div>
</template>
<script>
// import TabBarItem from "./TabBarItem";
export default {
  name:'TabBar',
  components:{
  }
}
</script>
<style  scoped>
#tab-bar {
  display: flex;
  background: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  box-shadow: 0px -2px 6px rgba(100, 100, 100, 0.2)
}
</style>