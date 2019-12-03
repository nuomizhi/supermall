//工具类
import { debounce } from "common/utils";

export const imageLoadMixin = {
  mounted() {
    console.log('我是mixin');

    const refresh = debounce(this.$refs.scroll.refresh, 200);
  },
}

import BackTop from "components/content/backTop/BackTop"
export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    // 回到顶部功能实现
    backClick() {
      // console.log('dianjil');
      //封装方法，直接给外部调用
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
}