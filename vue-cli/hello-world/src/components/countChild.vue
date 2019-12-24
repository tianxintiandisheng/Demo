<template>
    <div>
        <h1>以下内容来自子组件 </h1>
        <p>来自父组件的数据：{{message}}</p>
        <button v-on:click="changeMessage">改变提示信息</button>
    </div>
</template>

<script>
    export default {
        name: "countChild",
        props: ["message"],
        methods:{
            changeMessage(){
                this.$emit('update:message', "我来自countChild")
            }
        }
    }

</script>

<style scoped>

</style>