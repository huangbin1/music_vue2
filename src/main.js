// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueResource from 'vue-resource'
import router from './router'

Vue.use(MintUI)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent() {
            const matchingView = router[this.currentRoute]
            return matchingView ?
                require('./pages/' + matchingView + '.vue') :
                require('./pages/404.vue')
        }
    },
    render(h) {
        return h(this.ViewComponent)
    },
    template: '<App/>',
    components: { App }
})

window.addEventListener('popstate', () => {
    app.currentRoute = window.location.pathname
})