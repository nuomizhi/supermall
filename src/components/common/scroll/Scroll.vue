<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
// 对better-scroll进行一层包装，基本的这边设定，引用时个性化设定
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    options: {
      //scroll选项设置
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      // 对创建出来的scroll进行保存
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, this.options);
    if (this.options.probeType == 2 || this.options.probeType == 3) {
      //开启设置监听滚动才监听
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("contentScroll", position);
      });
    }
    if (this.options.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 上拉加载更多
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //封装给外部调用,后面的方法建议都加上&&判断
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 完成上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //完成刷新功能
    refresh() {
      // 刷新
      console.log("刷新了");
      // console.log(arguments);
      this.scroll && this.scroll.refresh();
    },
    getPositionY(){
      return this.scroll ? this.scroll.y : 0 ;

    }
  }
};
</script>
<style scoped>
</style>