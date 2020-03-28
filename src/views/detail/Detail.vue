<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'

import {getDetail, Goods} from 'network/detail'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  created() {
    this.iid = this.$route.params.iid;

    //根据iid请求数据
    getDetail(this.iid).then(res => {
      console.log(res)
      const data = res.result;
      //获取轮播图数据
      this.topImages = data.itemInfo.topImages;

      //获取商品信息（结构复杂，封装一个Goods类通过创建该类的实例对象来保存数据信息）
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
  }
}
</script>

<style scoped>

</style>
