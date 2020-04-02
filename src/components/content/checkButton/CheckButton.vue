<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button {
    /* 图片角落会超出一部分边框，因此overflow: hidden */
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #aaa;
  }

  .check {
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
