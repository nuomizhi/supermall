<template>
  <!-- 盒子包含一个图片，点击后背景和border都改 -->
  <div :class="{'selector-active': checked}" class="icon-selector">
    <img src="~/assets/img/cart/tick.svg" alt />
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  props: {
    checked: {
      type: Boolean,
      default() {
        return true;
      }
    }
  }
};
</script>
<style style>
.icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}
.icon-selector img {
  position: absolute;
}

.selector-active {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>
