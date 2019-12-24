<template>
    <div>
        <!--v-bind来绑定动态数据，静态数据可以不用v-bind指令(:是v-bind的简写)-->
        <h1>以下内容为父组件内容</h1>
        <p >欢迎语：{{hi}}</p>
        <button v-on:click="changeHi">改变欢迎语</button>
        <button v-on:click="getChildEvent">父组件调用子组件的方法（查看控制台）</button>
        <child-component ref="child" :message='message' :hi="hi" @listenToChild='getChildData' @fatherEventBus="fatherEvent" @fatherGetBrotherEventBus="fatherGetBrotherEvent"></child-component>
        <brother ref="brother"></brother>
    </div>
</template>

<script>
    import child from './child.vue';
    import brother from './brother.vue';
    export default {
        name: "father",
        data() {
            return {
                message: '我是父组件的数据',
                hi:"你好，我来自父组件"
            }
        },
        components: {
            'child-component': child,
            brother
        },
        mounted(){
            // this.changeHi();
        },
        methods: {
            getChildData (val) {
                console.log(this.hi);
                this.hi = val;
                console.log(this.hi);
                console.log(`子组件传递过来的数据: ${val}`);
            },
            getChildEvent () {
               this.$refs.child.emitEvent(this.message)
            },
            getBrotherEvent () {
                this.$refs.brother.emitEvent(this.message)
            },
            changeHi(){
                console.log(this.hi);
                this.hi = "你好，我来自父组件，但我改变了";
                console.log(this.hi);
            },
            fatherEvent(message){
                console.log(`我是父组件的方法我获取了子组件的数据: ${message}`);
            },
            fatherGetBrotherEvent(message){
                this.getBrotherEvent(message)
            }
        },
    }
</script>