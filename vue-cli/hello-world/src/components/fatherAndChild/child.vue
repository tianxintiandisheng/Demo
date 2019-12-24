<template>
    <div >
        <h1>以下内容为子组件内容</h1>
        <p> 父组件通过prop传递的数据：{{ message }}</p>
        <p>父组件通过prop传递的数据欢迎语：{{hi}}</p>
        <p> child默认的数据：{{ defaultMsg }}</p>
        <button v-on:click="sendData">发送数据至父组件</button>
        <button v-on:click="getFatherEvent">调用父组件的方法（查看控制台）</button>
        <button v-on:click="getBrotherEvent">调用兄弟组件的方法（查看控制台）</button>
       </div>
</template>

<script>
    import Bus from '../bus.js' ;
    export default {
        name: "child",
        data() {
            return {
                defaultMsg : '我是child组件的数据',
            }
        },
        props: {
            message: [String, Number],
            hi: [String, Number]
        },
        created () {
            // 在需要的传递数据的时候调用sendData方法，这里模拟调用
            // this.sendData();
            Bus.$on('listenToChild', this.getBrotherData);
        },
        mounted() {

        },
        methods: {
            sendData () {
                this.$emit('listenToChild', '你好！我来自子组件');
            },
            getBrotherData (val) {
                console.log(`a组件传递过来的数据: ${val}`); // hello
                this.defaultMsg = val;
            },
            getFatherEvent(){
              this.$emit('fatherEventBus',this.defaultMsg)
            },
            getBrotherEvent(){
                this.$emit('fatherGetBrotherEventBus',this.defaultMsg)
            },
            emitEvent(message){
                console.log(`我是子组件的方法接受了数据: ${message}`); // hello
            }
        }
    }
</script>