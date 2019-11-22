<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index"
      :goods-item="item"></goods-list-item>
  </div>
</template>
<script>

import GoodsListItem from './GoodsListItem'

//根据数据动态生成子组件的数量，并设置flex,子组件位置width为48%,
//justify-content: space-around;
export default {
  name:'GoodsList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 49px;
  }
</style>