//数据存储

const shop = {
    namespaced: true,//注意 模块化管理数据请不要忘了命名空间的开启
    state: {
        articles: [
            {
                id: 1,
                name: "可乐",
                price: 3,
                count: 1,
                status: true
            },
            {
                id: 2,
                name: "炸鸡",
                price: 12,
                count: 1,
                status: true
            },
            {
                id: 3,
                name: "汉堡",
                price: 6,
                count: 1,
                status: false
            },
        ],
        totalPrice: 0
    },
    mutations: {
        addCount: function (state, id) {
            state.articles[id - 1].count++;
            this.commit("shop/setTotalPrice");
        },
        decreaseCount: function (state, id) {
            if (state.articles[id - 1].count === 1) {
                console.log("商品数量已经无法减少");
            } else {
                state.articles[id - 1].count--
            }
            this.commit("shop/setTotalPrice");
        },
        setTotalPrice: function (state) {
            state.totalPrice = 0;
            for (let i = 0; i < this.getters["shop/getShopList"].length; i++) {
                let price = this.getters["shop/getShopList"][i].count * this.getters["shop/getShopList"][i].price;
                state.totalPrice = state.totalPrice + price
            }
        }

    },
    actions: {
        incrementAsync: function () {
            setTimeout(function () {
                console.log("异步操作")
            }, 2000)
        }
    },
    getters: {
        getShopList: state => {
            return state.articles.filter(article => article.status)
        }
    }
};


export default shop;