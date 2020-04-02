import { request } from "./request"

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

//获取详情页的推荐数据
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}

//封装商品信息数据结构的类
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.realPrice = itemInfo.lowNowPrice
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discountBgColor = itemInfo.discountBgColor //背景色
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

//封装商家信息数据结构的类
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

//商品参数
export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}