<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <router-link to="/HelloWorld"><p class="button__text">hello world</p></router-link>
        <router-link to="/Ajax"><p class="button__text">ajax发送请求</p></router-link>
        <router-link to="/father"><p class="button__text">组件传参</p></router-link>
        <router-link to="/count"><p class="button__text">sync修饰符实现父子组件数据双向绑定</p></router-link>
        <router-link to="/shop"><p class="button__text">vuex例子</p></router-link>
        <router-link to="/parent"><p class="button__text">插槽slot</p></router-link>
        <router-link to="/lazyLoadDemo"><p class="button__text">路由懒加载</p></router-link>
        <router-view></router-view>
    </div>
</template>

<script>


    export default {
        name: 'app',
        components: {

        },

    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
