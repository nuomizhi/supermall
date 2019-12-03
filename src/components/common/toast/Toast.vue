<template>
  <div class="toast" v-show="isShowToast">
    <span>{{message}}</span>
  </div>
</template>
<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: "hhh"
  //   },
  //   isShowToast:{
  //     type: Boolean,
  //     default: false
  //   }
  // }
  data() {
    return {
      message: "",
      isShowToast: false
    };
  },
  methods: {
    showToast(message, delayTime = 1200) {
      this.message = message;
      this.isShowToast = true;
      setTimeout(() => {
        this.isShowToast = false;
        this.message = "";
      }, delayTime);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 11;
  /* 注意怎么居中 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 6px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
}
</style>