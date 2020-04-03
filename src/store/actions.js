import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    //这个promise可以在detail中的dispatch接收到
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            //1.查找之前的数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                //2.添加商品
            if (oldProduct) {
                context.commit(ADD_COUNTER, oldProduct);
                resolve('商品个数+1')
            } else {
                payload.count = 1;
                context.commit(ADD_TO_CART, payload);
                resolve('已添加到购物车')
            }
        })
    }
}