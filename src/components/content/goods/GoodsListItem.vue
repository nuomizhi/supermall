<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img :src="showImage" alt @load="imgLoad" /> -->
    <!-- 使用图片懒加载 -->
    <img v-lazy="showImage" alt @load="imgLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.crav}}</span>
    </div>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    //通过事件总线向其它组件发送信息
    imgLoad() {
      if (this.$route.path.indexOf("/home") != -1) {
        // console.log(this.$route.path);
        // //首页详情图片加载事件
        // console.log('首页详情图片加载事件');
        this.$bus.$emit("homeItemImageLoad");
      } else if (this.$route.path.indexOf("/detail") != -1) {
        // console.log(this.$route.path);
        // //详情页详情图片加载事件
        // console.log('详情页详情图片加载事件');
        this.$bus.$emit("detailItemImageLoad");
      }
    },
    itemClick() {
      // 因为两个页面使用了此项功能，所以需要判断
      if (this.goodsItem.iid) {
        this.$router.push("/detail/" + this.goodsItem.iid);
      } else {
      console.log("点击了");
        return;
      }
    }
  },
  computed: {
    showImage() {
      // console.log(this.goodsItem.show);
      // 不知为何读不反过来就报错,其实show为undefined,还读取img，即为undefined.img，所以报错
      // return this.goodsItem.show.img || this.goodsItem.image
      if (this.goodsItem.show) {
        return this.goodsItem.show.img;
      } else {
        return this.goodsItem.image;
      }
    }
  }
};
</script>
<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  /* flex: 1; */
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>