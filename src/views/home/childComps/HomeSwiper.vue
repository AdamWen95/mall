<template>
    <swiper>
        <swiper-item v-for="(item, index) in banners" :key="index"> 
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imgLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
    name: "HomeSwiper",
    props: {
        banners: {
            type: Array,
            defualt() {
                return []
            }
        }
    },
    data() {
        return {
            //图片是否加载--->轮播图已加载事件发射一次就够了
            isLoad: false
        }
    },
    methods: {
        //发射轮播图片加载完的事件
        imgLoad() {
            if (!this.isLoad) {
               this.$emit('swiperImgLoad');
               //防止发射第二次
               this.isLoad = true
            }
        }
    },
    components: {
Swiper,
SwiperItem
    }
}
</script>

<style scoped>

</style>