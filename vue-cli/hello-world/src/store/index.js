import Vue from 'vue'
import Vuex from 'vuex'
import shop from './modules/shop'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
       shop
    }
});

export default store;

