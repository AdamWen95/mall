<template>
<!-- 这里的类名不要起swiper，会和swiper组件的类名冲突引起不滚动的问题 -->
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>

</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      defult() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}

</style>
