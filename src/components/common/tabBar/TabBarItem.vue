<template>
   <div class="tar-bar-item" @click="itemClick">
    <!-- 由于slot是会被替换的不确定性，所以外面包裹一个div再写入相关的样式会好点 -->
    <!-- v-if要写在else的前面    -->
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    <!-- <div :class="{active:isActive}">
      <slot name="item-text"></slot>
    </div> -->
    <!-- 绑定到计算属性 -->
     <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default: 'deeppink'
    }
  },
  data() {
    return {
      // isActive: true  
    };
  },
  computed: {
    isActive(){
      //通过对比当前路由的激活值来和当前的path作比较，动态决定颜色的显示
      //等于-1说明没有匹配的字符串，说明当前激活path与现在的path不匹配,也就是要返回false才行
      return this.$route.path.indexOf(this.path) != -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      // 在父组件传入当前点击组件的值，从而动态改变字符串的值,注意router与route
      this.$router.replace(this.path)
    }
  },
};
</script>
<style scoped>
.tar-bar-item {
  flex: 1;
  text-align: center;
  /* 一般49 */
  height: 49px;
  font-size: 14px;
}
.tar-bar-item img {
  width: 24px;
  height: 24px;
  /* margin: 0 auto; */
  margin-top: 3px;
  vertical-align: middle;
  /* display: block; */
}
.active {
  color: deeppink;
}
</style>