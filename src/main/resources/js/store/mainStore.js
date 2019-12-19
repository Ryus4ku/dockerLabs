import Vue  from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {

    },
    getters:{

    },
    mutations:{

    },
    actions:{
        async getDetected({state, commit}) {
            console.log(Vue);
            return await Vue.$http.post('vision')
        }
    }
});

export default store;