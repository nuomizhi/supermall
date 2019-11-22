<template>
<!-- 直接引用插件 -->
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
    
  </div>
</template>
<script>
export default {
  name:'HomeRecommend',
  props:{
    recommends:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 10px 0 18px;
    border-bottom: 8px solid #eee;
    justify-content:space-around;
  }
  .recommend span{
    display: block;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 70px;
    margin-bottom: 10px;
  }

</style>>
