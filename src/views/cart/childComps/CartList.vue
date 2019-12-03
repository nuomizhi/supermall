<template>
  <scroll class="wrapper" ref="scroll" :options="{click:true}">
    <cartListItem v-for="(item,index) in getCartList" :key="index" :item-info="item" />
  </scroll>
</template>
<script>
import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(["getCartList"])
  },
  methods:{
    refresh(){
      //组件自己的刷新，提供给父亲调用
      this.$refs.scroll.refresh()
    }
  }
};
</script>
<style scoped>
.wrapper {
  height: calc(100vh - 44px - 49px - 44px);
}
</style>
