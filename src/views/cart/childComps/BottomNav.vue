<template>
  <div class="bottom-nav">
    <div class="check-button">
      <check-button :checked="isSelectAll" @click.native="ckeckClick" />
      <span>全选</span>
    </div>
    <div class="price">合计:{{getTotalPrice}}</div>
    <div class="calculate">去结算：{{getCheckedLength}}</div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name: "BottomNav",
  components:{
  CheckButton
  },
  computed:{
    ...mapGetters(['getTotalPrice','getCheckedLength','getCartList']),
    isSelectAll(){
      //有很多方法
      //显示的状态，有一个不选中，则不显示全选中状态
      if (this.getCartList.length == 0) return false;  //长度为0，直接为false
      return !this.getCartList.find(item => !item.checked)  //找到一个未被选中的就返回

      // 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
   }
  },
  methods:{
    ckeckClick(){
      /*
      点击逻辑
      1.如果原来都选中，则点击切换为全部不选中
      2.如果原来全部不选中（或者部分不选中），则点击后全部选中
      注意改变checked状态通过mutations会比较好，但是这里图方便直接修改了
      */
     
     if (this.isSelectAll) {
       //说明全选状态
       this.getCartList.forEach(item => item.checked = false)
     } else {
       //说明不是全选状态或者部分不选中
       this.getCartList.forEach(item => item.checked = true)
     }
    }
  }
};
</script>
<style scoped>
.bottom-nav {
  height: 44px;
  line-height: 44px;
  background-color: #eee;
  display: flex;
  align-items: center;

}
.check-button{
  display: flex;
  align-items: center;
  width: 25%;
  height: 100%;
}
.check-button>div {
  /* background-color: #fff; */
  margin-left: 6px;
  margin-right: 4px;
}
.price{
  width: 45%;
  height: 100%;
  margin-left: 6px;
}
.calculate{
  width: 30%;
  height: 100%;
  text-align: right;
  padding-right: 16px;
  background-color: #ff8198;
  color: #fff;
}
</style>