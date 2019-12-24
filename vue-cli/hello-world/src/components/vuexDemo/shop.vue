<template>
    <div>
        <div v-for="item in getShopList" :key='item.id'>
            <p>商品名：{{item.name}}</p>
            <p>价格：{{item.price}}</p>
            <p >数量：{{item.count}}</p>
            <button @click="add(item.id)" >增加</button>
            <button @click="decrease(item.id)">减少</button>
        </div>
        <p>总价：{{totalPrice}}</p>
        <p>{{getShopList}}</p>
    </div>
</template>

<script>
    import { mapGetters, mapMutations,mapActions } from 'vuex'
    export default {
        name: "shop",
        computed: {
            //第一个参数为模块的名字，数组内为方法的名字
            ...mapGetters('shop',['getShopList']),
            totalPrice() {
                return this.$store.state.shop.totalPrice
            },
        },
        data (){
            return{

            }
        },
        mounted(){
            this.incrementAsync();
            this.setTotalPrice();
        },
        methods:{
            ...mapMutations('shop',['addCount','decreaseCount','setTotalPrice']),
            ...mapActions('shop',['incrementAsync']),
            add(id){
                this.addCount(id);
            },
            decrease(id){
                this.decreaseCount(id);
            },
        }
    }
</script>

<style scoped>

</style>