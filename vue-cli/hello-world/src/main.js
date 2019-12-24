import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router' // 导入vue-router 库
Vue.use(VueRouter);
Vue.config.productionTip = false;

import store from './store/index' //导入 store 对象



//组件引入
import HelloWorld from './components/HelloWorld.vue'
import Ajax from './components/Ajax.vue'
import count from './components/count.vue'
import father from './components/fatherAndChild/father.vue'
import shop from './components/vuexDemo/shop.vue'
import parent from './components/slotDemo/parent.vue'
import lazyLoadDemo from './components/lazyLoad/lazyLoadDemo'
// import home from './components/lazyLoad/home'
// import about from './components/lazyLoad/about'
const home = () => import('./components/lazyLoad/home');
const about = () => import('./components/lazyLoad/about');


const routes = [
    //利用重定向设置默认路由
    { path: '/', redirect: '/HelloWorld' },
    { path: '/HelloWorld', component: HelloWorld },
    { path: '/Ajax', component: Ajax },
    { path: '/father', component: father },
    { path: '/count', component: count },
    { path: '/shop', component: shop },
    { path: '/parent', component: parent },
    { path: '/lazyLoadDemo', component: lazyLoadDemo,
        children: [
            {
                path: 'home',
                component: home
            },
            {
                path: 'about',
                component: about
            }
        ]
    },

];

const router = new VueRouter({
    routes
});




new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
