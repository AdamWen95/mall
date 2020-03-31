<template>
  <div id="app">
    <!-- exclude中用的名称是组件中的name -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name: 'app',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
