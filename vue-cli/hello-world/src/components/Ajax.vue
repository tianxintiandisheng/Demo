<template>
    <div id="example-2">
        <!-- `post` 是在下面定义的方法名 -->
        <button v-on:click="post">登录</button>
        <p></p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Ajax",
        data() {
            return {}
        },
        methods: {
            post() {
                axios.post('/api/a/login?name=admin&pwd=123456', {
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },

    }
</script>

<style scoped>

</style>