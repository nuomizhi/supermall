<template>
  <div id="home">
    <!-- 只需一个购物街标题,所以只引用一个插槽 -->
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="wrapper"
      ref="scroll"
      :options="{probeType:3,click:true,pullUpLoad:true}"
      @contentScroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 由于轮播图组件较多,所以又可以给其封装 -->
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control :titles="['流行','新款','精选']"
        class="tab-control" 
        @tabClick="tabClick" 
        ref="tabControl"/>
      <!-- 将数据传给goods组件，动态创建,参数通过控制栏tab-control传到父组件知道当前点击了谁 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import NavBar from "components/content/navBar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFeature from "./childComps/HomeFeature";

// 网络相关的模块
import { getHomeMultidata, getHomeGoods } from "network/home";

//工具类
import {debounce} from 'common/utils'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    HomeRecommend,
    HomeFeature
  },
  data() {
    return {
      banners: [],
      dKeyword: [],
      keywords: [],
      recommends: [],
      goods: {
        // page用来记录每个组件浏览到那一页，而且还能用来去记录下一次该请求哪个页面的数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabControlOffsetTop: 0 //控制组件到顶部的距离
    };
  },
  created() {
    this.getMultidata();
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    //组件挂载好才去操作
    this.$bus.$on("itemImageLoad", () => {
      // console.log('加载了');
      // this.$refs.scroll.refresh();
      refresh();
    });
    //组件没有这个属性，要通过$el拿组件里面的元素
    this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop
    // console.log(this.tabControlOffsetTop);
    
  },
  methods: {
    //组件的方法,改变currentType，用来传给goodList组件
    tabClick(index) {
      //当有一个参数，html那把可以省略不写,case不用写=
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
    },
    // 通过改变isShowBackTop控制回到顶部按钮的实现
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
    },
    // 回到顶部功能实现
    backClick() {
      // console.log('dianjil');
      //封装方法，直接给外部调用
      this.$refs.scroll.scrollTo(0, 0);
    },
    //上拉加载更多
    loadMore() {
      // console.log('加载中');
      this.getGoods(this.currentType);
      // this.$refs.scroll.finishPullUp()
      // 两秒钟后才能继续上拉加载
      setTimeout(() => {
        this.$refs.scroll.finishPullUp();
      }, 500);
    },
    // 封装网络请求方法，方便直接调用
    getMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // 分别把data取出来,并且分类好
        (this.banners = res.data.data.banner.list),
          (this.dKeyword = res.data.data.dKeyword.list),
          (this.keywords = res.data.data.keywords.list),
          (this.recommends = res.data.data.recommend.list);
      });
    },
    //获取最下面的单个产品的数据goods
    getGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list);
      });
      this.goods[type].page = page;
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  }
};
</script>
<style scoped>
/* 设备适配放在后面 */

#home {
  /* 解决home-bar脱离标准流带来的头部缩进去问题 */
  padding-top: 44px;
}

.home-bar {
  background-color: var(--color-tint);
  color: #fff;
  /* 最顶层显示 */
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
/* 新特性，此元素达到顶部44px,改变position,但是兼容性不好，
  用来控制栏下滑置顶 */
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
/* 有两种方案来确定wrapper的高度，一是定位，二是计算 */
.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>