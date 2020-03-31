<template>
<div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 复制一个tab-control 在吸顶时将这个显示出来，避免在原来的tab-control上添加类出现的问题-->
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>

<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

</div>
</template>

<script>
//导入公用组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

//导入home的子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

//导入网络请求等封装好的函数
import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'

export default {
    name: "Home",
    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                //保存tab-control的数据
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []},
            },
            //当前选中的标签
            currentType: 'pop',
            isShowBackTop: false,
            isTabFixed: false,
            tabOffsetTop: 0,
            saveY: 0
        }
    },
    components: {
        NavBar,
        TabControl,
        Scroll,
        BackTop,
        GoodsList,
        HomeSwiper,
        RecommendView,
        FeatureView
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    created() {
        //created内部尽量简洁，方法用methods包装，在这里直接调用methods的方法就行
        //请求轮播图和推荐的数据
        this.getHomeMultidata()

        //请求tab-control的商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')


    },
    mounted() {//为确保this.$refs.scroll已经有值，将该刷新步骤放到mounted中
        //监听goodsitem中图片加载完成
        //通过防抖函数避免过于频繁的刷新
        const refresh = debounce(this.$refs.scroll.refresh, 100)
        this.$bus.$on('itemImgLoad', () => {
            refresh()
        })
    },
    //回来时定位到离开前的位置
    activated() {
      //先refresh，再scrollTo，不然会导致有时候页面滚回顶部
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    //离开时记录滚动到的位置
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY();
    },
    methods: {
        tabClick(index) {
            switch(index) {
                case 0: this.currentType = 'pop';
                break;
                case 1: this.currentType = 'new';
                break;
                case 2: this.currentType = 'sell';
                break;
            }
            //两个标签栏的选中标签保持一致
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        getHomeMultidata() {
            getHomeMultidata().then(res => {
            // console.log(res);
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
            })
        },
        getHomeGoods(type) {
            //每次请求的是下一页的数据
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then(res => {
                //使用了...运算符展开数组，因为push可以传入多个值
                this.goods[type].list.push(...res.data.list);
                //添加完数据后页数+1
                this.goods[type].page += 1;
                //通过调用子组件的finishPullUp来使下次下拉能再一次加载更多
                this.$refs.scroll.finishPullUp()
            })
        },
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        contentScroll(position) {
            //1.判断back-top是否显示
            this.isShowBackTop = (-position.y) > 1000;
            //2.决定tab-control是否吸顶
            this.isTabFixed = (-position.y) >= this.tabOffsetTop;
            // console.log(position)
        },
        loadMore() {
            this.getHomeGoods(this.currentType)
        },
        //监听轮播图加载完后再获取TabControl的offsetTop值，不然获取到的高度会小于实际高度
        swiperImgLoad() {
            //通过.$el获取组件中的元素，组件没有offsettop属性
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            // console.log(this.$refs.tabControl.$el)
        }
    }
}
</script>

<style scoped>
#home {
    /* padding-top: 44px; */
    position: relative;
    /* 子盒子.content加了绝对定位，脱离标准流，父盒子是被撑开的->父盒子高度变0，需要给父盒子自己加一个高度，（100vh->视口高度） */
    height: 100vh;
}

.home-nav {
    background-color: var(--color-tint);
    color: #fff;

/* 导航栏下面的内容使用better-scroll包裹后局部滚动，因此导航栏不需要fixed */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
}

/* 用了better-scroll包裹，这个吸顶的样式就不再起作用了 */
/* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
} */

/* 会导致tab-control栏脱标 然后下面的内容瞬间上去，而且better-scroll里面通过translate控制元素的位移，在滚动时会使tab-control加上translate移动的距离从而跑到很上面而看不见 */
/* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
} */

/* 给复制的tab-control添加样式 */
.tab-control {
    position: relative;
    z-index: 9;
}

.content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
}
</style>
