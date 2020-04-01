import { debounce } from './utils';

//home和detail都需要使用页面加载完成再刷新scroll事件，代码重复，使用混入技术
export const itemListenerMixin = {
    data() {
        return {
            //保存的是图片加载完刷新scroll的函数
            itemImgListener: null
        }
    },
    mounted() {
        //为确保this.$refs.scroll已经有值，将该刷新步骤放到mounted中
        //监听goodsitem中图片加载完成
        //通过防抖函数避免过于频繁的刷新
        const refresh = debounce(this.$refs.scroll.refresh, 100)
            //对监听的事件进行保存
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
    }
}