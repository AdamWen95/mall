<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "Scroll",
    props: {
        probeType: {
            type: Number,
            defult: 0
        },
        pullUPLoad: {
            type: Boolean,
            defult: false
        }
    },
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        //创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            //scroll里面除了button之外其他元素的点击事件如果要被监听到需要设置true
            click: true,
            probeType: this.probeType,
            pullUPLoad: this.pullUPLoad
        }),
        //监听滚动的位置
        this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
        }),
        //监听上拉事件
        this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
        })
    },
    methods: {
        //父组件通过$refs拿到子组件并调用子组件已经封装的方法会比直接在父组件调用方法更好，因此对scroll的方法做一层封装
        //scrollTo第三个参数代表到达目标坐标所需的时间，这里默认传入300ms
        scrollTo(x, y, time=300) {
            this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll.finishPullUp()
        }
    },
}
</script>

<style scoped>

</style>