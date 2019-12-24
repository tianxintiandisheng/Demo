<template>
    <div>
        <p>点击按钮计数加一</p>
        <input v-model="msg" placeholder="edit me">
        <button v-on:click="changeCount">{{counter}}</button>
        <p>父组件数据:{{message}}</p>
        <button v-on:click="changeMessage">改变提示信息</button>
        <countChild :message.sync="message"></countChild>
    </div>
</template>

<script>
    import countChild from "./countChild"
    export default {
        name: "count",
        data(){
            return {
                counter: 1,
                msg: "edit me",
                message: "我是count的数据"
            }
        },
        components: {
            countChild
        },
        methods:{
            changeCount(){
                this.counter =  this.counter + 1;
                console.log(this.counter)
            },
            changeMessage(){
                this.message ="我是count的数据,但我改变了"
            }
        }
    }
</script>

<style scoped>

</style>