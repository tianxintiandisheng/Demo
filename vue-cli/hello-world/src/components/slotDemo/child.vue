<template>
    <div id="child">
        <h1>以下为子组件内容 </h1>
        <slot><h3>默认替换不带slot的元素</h3></slot>
        <slot name="one">会被替换成父组件中slot="one"的元素</slot>
        <slot name="two">会被替换成父组件中slot="two"的元素</slot>
        <p>子组件自己的标签</p>
    </div>
</template>

<script>
    export default {
        name: "child"
    }
</script>

<style scoped>

</style>