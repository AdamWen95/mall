import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

//导入自己封装地toast插件
import toast from 'components/common/toast'

Vue.config.productionTip = false

//$bus原本为空，通过vue的原型使他变成一个vue实例，用来当作事件总线
Vue.prototype.$bus = new Vue()

//安装自己封装的toast插件，本质上是调用toast的install函数
Vue.use(toast)

//解决移动端点击事件300ms的延迟
FastClick.attach(document.body)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')