import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        items:[],
        maxInstancePages: 1,
        stats: null
    },
    mutations: {
        FETCH_ALL_INSTANCES(state, {items, meta}){
            state.items = items;
            state.maxInstancePages= Math.ceil(meta.total/meta.max_results);
        }
    },
    actions: {
        fetch_all_instances({commit}){
            fetch('/instance')
            .then(res => res.json())
            .then( res => commit('FETCH_ALL_INSTANCES', { items: res._items, meta: res._meta}))
            .catch( err => console.error(err));
        }
    }
});