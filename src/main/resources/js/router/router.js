/*----------------------Libs--------------------*/
import Vue               from 'vue'
import VueRouter         from 'vue-router'
import S3                from "../pages/S3.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: S3
    }
];

const router = new VueRouter({
    mode: "history",
    hash: false,
    routes
});

router.beforeEach((to, from, next) => {
    const {middleware} = to.meta;
    if (!middleware) return next();

    const context = {to, from, next, store};

    return middleware[0]({
        ...context,
        next: pipeline(context, middleware, 1)
    })
});

export default router;