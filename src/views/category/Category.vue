<template>
    <div class="category">
      <!-- 导航栏 -->
      <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
      <!-- 侧边栏 -->
      <slide-bar :slide-bar-list="categoryList"></slide-bar>
      <!-- 分类内容 -->
      <scroll class="scroll-content" ref="scroll">
        <!-- 分类子数据 -->
        <sub-category :category-list="subCategoryList[currentIndex]"></sub-category>
        <!-- 标签栏和分类详情数据-->
        <tab-control :titles="titleList" @tabClick="tabClick" ref="tabControl"></tab-control>
        <goods-list :goods="categoryDetailList"></goods-list>
      </scroll>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import TabControl from 'components/content/tabControl/TabControl'

import SlideBar from './childComps/SlideBar'
import SubCategory from './childComps/SubCategory'

import {getCategory, getSubCategory, getCategoryDetail} from "network/category"
import {itemListenerMixin} from "common/mixin"

export default {
    name: "Category",
    data() {
      return {
        //侧边栏数据
        categoryList: [],
        //分类子数据
        subCategoryList: [],
        categoryDetailList: [],
        //当前选中分类标签
        currentIndex: 0,
        titleList: ["流行", "新款", "精选"],
        // keyList: []
        currentType: 'pop'
      }
    },
    //标签页的选择、scroll在图片加载完刷新（防抖）
    mixins: [itemListenerMixin],
    components: {
      NavBar,
      SubCategory,
      TabControl,
      Scroll,
      SlideBar,
      GoodsList
    },
    created() {
      this.getCategory();
    },
    methods: {
      //侧边栏的点击
      slideBarItemClick({maitKey, index}) {
        this.currentIndex = index;
        // 每次切换分类初始化tabControl的下标
        this.$refs.tabControl.currentIndex = 0;
        // 请求对应的推荐列表
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "pop");
        // 如果keyList中存在maitKey证明数据已经请求过了
        // if (this.keyList.includes(maitKey)) return this.$store.commit("setLoading", false);
        // this.$store.commit("setLoading", true);
        // 如果不存在请求数据并且存储key
        // this.keyList[index] = maitKey;
        this.getSubCategory(this.categoryList[this.currentIndex].maitKey, index);
      },
      getCategory() {
        getCategory().then(res => {
          // console.log(res.data.category.list);
          this.categoryList = res.data.category.list;
          this.$nextTick(() => {
            this.getSubcategory(this.categoryList[0].maitKey, 0);
            this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
            // 初始化push第一个key进去
            // this.keyList.push(this.categoryList[0].maitKey);
          });
        });
      },
      //请求分类子数据
      getSubCategory(key, index) {
        getSubCategory(key).then(res => {
          // console.log(res.data.list);
          this.subCategoryList[index] = res.data.list;
        });
      },
      //请求分类详情数据
      getCategoryDetail(key, type) {
        getCategoryDetail(key, type).then(res => {
          // console.log(res);
          this.categoryDetailList = res;
        });
      },

      tabClick(index) {
        //根据点击的标签确定currentType值
        switch(index) {
          case 0: this.currentType = 'pop';
          break;
          case 1: this.currentType = 'new';
          break;
          case 2: this.currentType = 'sell';
          break;
        }
        //根据currentType值去请求分类详情数据
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, this.currentType);
      }
    }
}
</script>

<style scoped>
  .nav-bar {
  font-weight: 600;
  color: white;
  background-color: var(--color-tint);
}

.scroll-content {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 100px;
  overflow: hidden;
}
</style>
