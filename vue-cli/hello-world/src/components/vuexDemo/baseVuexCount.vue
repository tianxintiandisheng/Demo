<template>
    <div>
        <p>{{ count }}</p>
        <button v-on:click="setCount">设置count的值</button>
        <button v-on:click="request">异步操作</button>
        <p>过滤后的数据：{{ doneTodosCount }}</p>
        <child-count></child-count>
    </div>

</template>

<script>
    import childCount from "./childCount"

    export default {
        name: "baseVuexCount",
        components: {
            childCount
        },
        computed: {
            count() {
                return this.$store.state.count
            },
            doneTodosCount() {
                return this.$store.getters.doneTodos[0].text
            }
        },
        methods: {
            setCount() {
                this.$store.commit('increment');//显式调用法法来改变数据
                console.log(this);
                console.log(this.$store);
            },
            request() {
                this.$store.dispatch('incrementAsync')//模拟发送请求，异步操作
            }
        }
    }
</script>

<style scoped>

</style>