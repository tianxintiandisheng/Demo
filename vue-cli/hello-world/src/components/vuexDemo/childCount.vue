<template>
    <p>{{count}}</p>
</template>

<script>
    export default {
        name: "childCount",
        computed: {
            count () {
                return this.$store.state.count
            }
        },
    }
</script>

<style scoped>

</style>