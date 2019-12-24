<template>
    <div>
        <h1>父组件</h1>
        <child>
            <!--等待分发的内容-->
            <p slot="one">父组件的一些内容</p>
            <p slot="two">父组件的另外一些内容</p>
            <p>父组件的不带slot属性的标签</p>
        </child>
    </div>

</template>

<script>
    import child from "./child"
    export default {
        name: "parent",
        components: {
            child
        },
    }
</script>

<style scoped>

</style>