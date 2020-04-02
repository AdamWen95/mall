<template>
    <div class="cart">
      <!-- 导航栏 -->
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{length}})</div>
      </nav-bar>

      <!-- 商品列表 -->
      <cart-list></cart-list>

      <!-- 底部汇总 -->
      <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

//使用vuex中getters的另一种方式
import {mapGetters} from 'vuex'

export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //使用vuex中getters的另一种方式：在此展开vuex中的getters
      //第一种写法：数组写法
      // ...mapGetters(['cartLength'])
      //第二种写法：对象写法，可以自己取名字
      ...mapGetters({
        length: 'cartLength'
      })
    }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
