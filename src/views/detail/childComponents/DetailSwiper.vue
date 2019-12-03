<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages" 
        :key="index"
        class="detail-swiper-item">
        <img :src="item" alt="">  
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper' 
export default {
  name:'DetailSwiper',
  props:{
    topImages:{
      type: Array,
      default(){
        []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>
<style style>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>