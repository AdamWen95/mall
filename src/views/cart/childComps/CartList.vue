<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    //每次进入购物车页面就刷新，因为scrollheight是一开始计算的高度，在添加了商品后需要重新计算高度，不然会无法滚动
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
