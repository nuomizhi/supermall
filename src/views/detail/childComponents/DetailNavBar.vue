<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles" 
          :key="index" 
          class="titles-item"
          :class="{active: index == currentIndex}"
          @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
// 此组件负责navbar的实现和展示
import NavBar from "components/content/navBar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  methods: {
    // 动态改变字体颜色
    titleClick(index){
      //可以滚动时候对齐赋值
      // this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    //点击返回
    backClick(){
      this.$router.back()
    }
  },
};
</script>
<style style>
/* 在之前父亲flex的布局基础下再进行flex布局 */
.titles {
  display: flex;
  font-size: 16px;
}
.titles-item {
  flex: 1;
}
.back{
  padding-top: 6px
}
.active{
  color: var(--color-high-text)
}
</style>