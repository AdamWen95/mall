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
        pullUpLoad: {
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
        })
        //监听滚动的位置
        if (this.probeType === 2 || this.probeType === 3) {
            this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
            })
        }
        //监听scroll滚动到底部
        if (this.pullUpLoad) {
            this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
            })
        }
    },
    methods: {
        //父组件通过$refs拿到子组件并调用子组件已经封装的方法会比直接在父组件调用方法更好，因此对scroll的方法做一层封装
        //scrollTo第三个参数代表到达目标坐标所需的时间，这里默认传入300ms
        scrollTo(x, y, time=300) {
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        //刷新scroll，防止出现scrollerHeight没有更新的情况
        refresh() {
            //scroll是mounted时候创建的，在图片加载完就调用可能会出现还没有这个方法的情况->报错，因此用&&确定有scroll对象再调用方法
            this.scroll && this.scroll.refresh()
        },
        //需要结束pullUp，不然不能进行下一次pullUp
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        },
        //获取滚动的位置
        getScrollY() {
            return this.scroll ? this.scroll.y : 0;
        }
    },
}
</script>

<style scoped>

</style>