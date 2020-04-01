<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <!-- 用goodsList展示推荐数据 -->
      <goods-list :goods="recommends" ref="recommend"></goods-list>
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
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {
  name: "Detail",
  //混入
  mixins: [itemListenerMixin],
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
      paramInfo: {},
      //评论信息
      commentInfo: {},
      //推荐数据
      recommends: [],
      //每个标题对应的y值（用于scroll滚动）
      themeTopYs: [],
      //保存获取themeTopY值的这个函数，因为原函数需要做防抖处理
      getThemeTopY: null,
      //当前高亮的标题索引
      currentIndex: 0
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  created() {
    this.iid = this.$route.params.iid;

    //根据iid请求数据
    getDetail(this.iid).then(res => {
      // console.log(res)
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

      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //请求推荐数据
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.list
    })

    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      //获取各个标题对应的元素的offsetTop值
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    }, 100)

    //获取各个标题对应的元素的offsetTop值
    // this.$nextTick(() => {
      //在下一帧获取到数据后，也就是对应的DOM已经被渲染出来的时候获取对应的offsetTop
      //但是图片还没加载完（高度会小于预期高度）
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // })
  },
  //mounted的时候可能数据还没请求过来，因此可能获取不到部分子组件的根元素$el
  mounted() {
    //和home一样，需要等图片加载完再刷新scroll
    //由混入的代码执行这个操作

  },
  //detail没有keep-alive因此不能用deactivited，使用destroyed
  destroyed() {
    //同样的，不需要监听全局事件（home中的图片加载完成事件也会发射itemImgLoad）
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    //在详情图片加载完后，获取各个标题对应的元素的offsetTop值
      this.getThemeTopY();
    },

    //点击详情页标题
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },

    //监听滚动，滚到对应位置高亮对应标题
    contentScroll(position) {
      //1.获取y值，记得负号
      const positionY = -position.y;
      //2.y值对比
      let length = this.themeTopYs.length;
      for(let i = 0; i < length; i++) {
        //this.currentIndex !== i是为了不要进行太频繁的操作；四个区间分别对应一个索引，其中最后一个只需要判断是否>=就行
        if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
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

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /* 如果用calc(100% - 44px)+overflow: hidden的方法，这个和detail-nav都是标准流，在获取元素offsetTop的时候获取的是到nav顶部的高度，那么在定位滚动的时候会多滚44px */
    /* height: calc(100% - 44px);
    overflow: hidden; */
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
