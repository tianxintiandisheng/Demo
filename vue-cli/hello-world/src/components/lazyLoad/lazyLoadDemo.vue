<template>
    <div>
        <router-link to="/lazyLoadDemo/home"><p class="button__text">主页</p></router-link>
        <router-link to="/lazyLoadDemo/about"><p class="button__text">关于我们</p></router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "lazyLoadDemo"
    }
</script>

<style scoped>

</style>