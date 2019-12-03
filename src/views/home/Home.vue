<template>
  <div id="home">
    <!-- 只需一个购物街标题,所以只引用一个插槽 -->
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabControlFixed"
    />
    <scroll
      class="wrapper"
      ref="scroll"
      :options="{probeType:3,click:true,pullUpLoad:true}"
      @contentScroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 由于轮播图组件较多,所以又可以给其封装 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommends="recommends" />
      <home-feature />
      <!-- 标签栏tab-control的吸顶效果通过外面建一个同样的tab-control，然后通过判断位置来动态的决定显示哪一个-->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
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

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFeature from "./childComps/HomeFeature";

// 网络相关的模块
import { getHomeMultidata, getHomeGoods } from "network/home";

import { debounce } from "common/utils";
import {backTopMixin} from "common/mixin"

export default {
  name: "Home",
  mixins:[backTopMixin],
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
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
      tabControlOffsetTop: 0, //控制组件到顶部的距离
      isTabControlFixed: false, //控制标签控制栏的吸附
      leavePositionY: 0 //记录离开时当前的y的位置
    };
  },
  created() {
    this.getMultidata();
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  mounted() {
    /*
    关于首页和详情页共同监听这图片有两个方案
    一可以携带变量，判断是哪个页面发出的
    第二为切换出组件后把监听移除
    三位判断路由分别发出事件
    */
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    // 组件挂载好才去操作
    this.$bus.$on("homeItemImageLoad", () => {
      // console.log('加载了');
      // this.$refs.scroll.refresh();
      refresh();
    });
  },
  destroyed() {
    console.log("destroyed");
  },
  // 一激活组件时候就滚到之前离开的位置,新版本better-scroll貌似不用
  activated() {
    //注意刷新一下
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.leavePositionY, 0);
    // console.log("激活");
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  deactivated() {
    this.leavePositionY = this.$refs.scroll.getPositionY();
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
      // 因为有两个个标签控制组件,所以一个组件内被点击时,同时得修改另一个组件的状态
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 此函数能实时监听y的位置
    // 通过改变isShowBackTop控制回到顶部按钮的实现
    //通过改变 isTabControlFixed来决定是否改变标签控制的fixed
    contentScroll(position) {
      this.isTabControlFixed = -position.y > this.tabControlOffsetTop;
      //如果下面的句子逻辑较复杂,也可以封装为一个方法
      this.isShowBackTop = -position.y > 1000;
    },
    //上拉加载更多
    loadMore() {
      // console.log('加载中');
      this.getGoods(this.currentType);
      // DOM改变记得刷新
      this.$refs.scroll.refresh();
      // this.$refs.scroll.finishPullUp()
      // 两秒钟后才能继续上拉加载
      setTimeout(() => {
        this.$refs.scroll.finishPullUp();
      }, 500);
    },
    //监听轮播图的图片有没有加载至少一张
    swiperImageLoad() {
      //组件没有这个属性，要通过$el拿组件里面的元素
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabControlOffsetTop);
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
  /* 使用原生时候解决home-bar脱离标准流带来的头部缩进去问题 */
  /* padding-top: 44px; */
}

.home-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
  /* 使用原生时候,最顶层显示, */
  /* position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* 新特性，此元素达到顶部44px,改变position,但是兼容性不好，
  用来控制栏下滑置顶 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/* 有两种方案来确定wrapper的高度，一是定位，二是计算 */
.wrapper {
  /* 使用absolute时为了计算出高度，如果使用relative会相对于其父元素计算 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>