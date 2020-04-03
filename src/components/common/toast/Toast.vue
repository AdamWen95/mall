<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    //封装方法，其他组件想用这个插件只需要调用这个方法并传入参数
    show(message, duration = 1500) {
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    transform: translate(-50%, -50%);
    z-index: 999;

    text-align: center;

    color: white;
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>
