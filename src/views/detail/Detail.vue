<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="detailNavBar" />
    <scroll
      class="wrapper"
      ref="scroll"
      :options="{click:true,probeType:3}"
      @contentScroll="contentScroll"
    >
      <!-- <div v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</div> -->
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imagesLoad="imagesLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goods="recommend" ref="recommend" />
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- <toast class="toast" :message="toastMessage" :isShowToast="isShowToast" /> -->
  </div>
</template>
<script>
//通过路由的方式，向这里传递一个iid，然后根据这个iid去请求商品详细信息
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

//公共组件
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import Toast from "components/common/toast/Toast";

//网络请求相关
import {
  getDetail,
  getDetailGoods,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";
import { log } from "util";

export default {
  name: "Detail",
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    GoodsList,
    Scroll
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      navTitlePosition: [], //导航栏title对应的位置
      currentIndex: 0, //对滚动位置起记录位置
      isTitleClick: false
      // toastMessage: "",
      // isShowToast: false
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    //组件一创建就去请求数据
    getDetail(this.iid).then(res => {
      const result = res.data.result;
      // console.log(result);
      this.topImages = result.itemInfo.topImages;
      this.goods = new Goods(
        result.itemInfo,
        result.columns,
        result.shopInfo.services
      );
      this.shop = new Shop(result.shopInfo);
      this.detailInfo = result.detailInfo;
      this.paramInfo = new GoodsParam(
        result.itemParams.info,
        result.itemParams.rule
      );
      // if (result.rate.cRate == 0) {
      //   // console.log(this.commonInfo);
      //   //说明没评论
      //   this.commentInfo = {content:'此商品没有评论'}
      //   this.commentInfo.isEmpty = true

      // } else {
      //   this.commentInfo = result.rate.list[0];
      //   this.commentInfo.isEmpty = false
      // }
      if (result.rate.cRate !== 0) {
        this.commentInfo = result.rate.list[0];
      }
    });
    //请求推荐数据
    getDetailGoods().then(res => {
      // console.log(res);
      this.recommend = res.data.data.list;
    });
  },
  mounted() {
    //要实现防抖，怎么把refesh这个函数保存起来
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    //组件挂载好才去操作
    this.$bus.$on("detailItemImageLoad", () => {
      // console.log('加载了');
      // this.$refs.scroll.refresh();
      refresh();
    });
  },
  destroyed() {
    // console.log("被销毁");
  },
  methods: {
    imagesLoad() {
      // console.log('图片加载了');
      this.$refs.scroll.refresh();

      //像首页那里一样的防抖动功能
      // const refresh = this.debounce(this.$refs.scroll.refresh,200);
      // refresh();
      //offsetTop相对于其父级元素并具有定位属性的元素
      this.navTitlePosition.push(0);
      this.navTitlePosition.push(-this.$refs.param.$el.offsetTop);
      this.navTitlePosition.push(-this.$refs.comment.$el.offsetTop);
      this.navTitlePosition.push(-this.$refs.recommend.$el.offsetTop);
      this.navTitlePosition.push(-Number.MAX_VALUE);
    },
    titleClick(index) {
      // console.log(index);
      // console.log(this.navTitle[index]);
      // 只有被赋值position时候才进行滚动
      if (this.navTitlePosition.length != 0) {
        this.$refs.scroll.scrollTo(0, this.navTitlePosition[index]);
      }
    },
    contentScroll(position) {
      // console.log(position);
      //老师的方法1(注意下标的问题),其实可以有很多种方法
      const length = this.navTitlePosition.length;
      const y = position.y;
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex != i &&
      //     ((i < length - 1 &&
      //       y <= this.navTitlePosition[i] &&
      //       y > this.navTitlePosition[i + 1]) ||
      //       (i == length - 1 && y <= this.navTitlePosition[i]))
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.detailNavBar.currentIndex = i;
      //   }
      // }
      //方法二，在数组最后面加上一个无穷大的值
      //方法三，在数组后面加上最大值
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex != i &&
          y <= this.navTitlePosition[i] &&
          y > this.navTitlePosition[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailNavBar.currentIndex = i;
        }
      }
      //控制是否显示
      this.isShowBackTop = -position.y > 1000;
    },
    //添加购物车
    addToCart() {
      //需要图片，价格，iid,标题,不好收集，细心
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.iid = this.iid;
      product.desc = this.goods.desc;
      product.price = this.goods.lowNowPrice;
      product.count = 1; // 默认添加一件商品
      product.checked = true;

      //加上购物车，有两个知识点（mapMutations不仅仅只有getters才能映射,promise）
      //this.$store.dispatch('addCart',product)  //单一职责，让判断放在action中，mutatios尽可能只做一件事

      this.$store.dispatch("addCart", product).then(res => {
        // console.log(res);
        // this.handleToast(res, true);
        this.handleToast(res);
      });
    },
    //对吐司的状态进行操作
    handleToast(res) {
      // this.toastMessage = res;
      // this.isShowToast = true;
      // setTimeout(() => {
      //   this.isShowToast = false;
      // }, 1200);
      // console.log(this.$toast.showToast);
      this.$toast.showToast(res);
    }
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  /* 注意tarbar设置的层级为9 */
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 2;
  background-color: #fff;
}
.wrapper {
  /* 这里使用relative是因为给父亲设置过高度 */
  background-color: #fff;
  position: relative;
  height: calc(100% - 44px - 58px);
  z-index: 1;
}
.bottom-bar {
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
}
/* .toast {

} */
</style>