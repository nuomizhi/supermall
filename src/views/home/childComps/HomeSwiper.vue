<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <!-- 监听轮播图是否至少加载一张，来给父组件判断offset的高度 -->
          <img :src="item.image" alt @load="imgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
//可以写在一起时因为index.js的作用
import { Swiper, SwiperItem } from "components/common/swiper";
import { log } from 'util';
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods:{
    imgLoad(){
      if (!this.isLoad) {
        this.isLoad = true;
        this.$emit('swiperImageLoad')
      }
    }
  }
};
</script>
