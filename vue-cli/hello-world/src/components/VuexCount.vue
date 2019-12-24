<template>
    <h1>{{count}}</h1>
</template>

<script>

    export default {
        name: "VuexCount",

        computed:{
            count(){
                //返回获取到的数据
                return this.$store.state.count
            }
        }
    }
</script>

<style scoped>

</style>