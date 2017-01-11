// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueResource from 'vue-resource'
//import VueRouter from 'vue-router'
//import router from './router'
import VueRouter from 'vue-router'
import TopListPage from './components/toplistpage.vue'

Vue.use(MintUI)
Vue.use(VueResource)
Vue.use(VueRouter)

document.addEventListener('DOMContentLoaded', function() {
    if (window.FastClick) window.FastClick.attach(document.body);
}, false);

const routes = [
    { path: '/toplistpage', name: 'toplistpage', component: TopListPage }
]

const router = new VueRouter({
    base: __dirname,
    routes
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router
})

let indexScrollTop = 0;
router.beforeEach((route, redirect, next) => {
    if (route.path !== '/') {
        indexScrollTop = document.body.scrollTop;
    }
    document.title = route.meta.title || document.title;
    next();
});

router.afterEach(route => {
    if (route.path !== '/') {
        document.body.scrollTop = 0;
    } else {
        Vue.nextTick(() => {
            document.body.scrollTop = indexScrollTop;
        });
    }
});