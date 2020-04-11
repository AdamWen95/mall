<template>
    <div class="goods-item" @click="itemClick">
      <!-- src不能写死，不同的父组件传入的数据格式不同，采用计算属性showImage -->
        <img :src="showImage" alt="" @load="imgLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "GoodsListItem",
    props: {
        goodsItem: {
            type: Object,
            defult() {
                return {}
            }
        }
    },
    computed: {
      //有的父组件的数据层级格式不同，比如详情页的推荐没有show这一级，分类页直接是img
      showImage() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad() {
        //发射图片加载的事件到事件总线
        this.$bus.$emit('itemImgLoad')
      },
      itemClick() {
        //记得在/detail后面加/
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
}
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
