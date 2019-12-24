<template>
    <div>
        <h1>我是兄弟组件 </h1>
        <button v-on:click="sendData">发送数据至我的兄弟child</button>
    </div>
    
</template>

<script>
    import Bus from '../bus.js' ;
    export default {
        name: "brother",
        created () {
        },
        methods: {
            sendData () {
                Bus.$emit('listenToChild', '你好！我来自兄弟组件');
            },
            emitEvent(message){
                console.log(`我是兄弟组件的方法接受了数据: ${message}`); // hello
            }


        }

    }
</script>

<style scoped>

</style>