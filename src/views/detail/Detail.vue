<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      //如果一开始为null，那么因为在子组件中的默认值是{}，会引起报错，因此这边一开始设为空对象
      goods: {},
      shop: {},
      //商品详情数据
      detailInfo: {},
      //商品参数
      paramInfo: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
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

      //获取商家信息
      this.shop = new Shop(data.shopInfo)

      //获取商品详情数据
      this.detailInfo = data.detailInfo;

      //获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  #detail {
    /* 盖住底部导航栏 */
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* 给父元素一个高度，不然会导致scroll的高度太大无法滚动 */
    height: 100vh;
  }

  /* .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  } */

  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
