import Vue         from 'vue'
import 'vuetify/dist/vuetify.min.css'
import '@babel/polyfill';
import router      from './router/router'
import lodash      from 'lodash'
import VueResource from 'vue-resource'
import App         from './pages/App.vue'
import Vuetify     from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, VueResource, lodash);

new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify({
        icons: {
            iconfont: 'mdiSvg'|| 'faSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
        },
    }),
    render: a => a(App)
});