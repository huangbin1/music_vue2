// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/App'
import Home from './pages/Home'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
//import router from './router'

Vue.use(VueRouter)
Vue.use(MintUI)
Vue.use(VueResource)

// 1. 定义（路由）组件。  
// 可以从其他文件 import 进来  
// const Foo = { template:'#app' };  
// const Bar = { template:'#xia' };  
// 2. 定义路由  
// 每个路由应该映射一个组件。 其中"component" 可以是  
// 通过 Vue.extend() 创建的组件构造器，  
// 或者，只是一个组件配置对象。  
const routes = [
    { path: '/', component: App },
    { path: '/home', component: Home }
];  
// 3. 创建 router 实例，然后传 `routes` 配置  
// 你还可以传别的配置参数, 不过先这么简单着吧。  
const router = new VueRouter({ routes:routes });  
// 4. 创建和挂载根实例。  
// 记得要通过 router 配置参数注入路由，  
// 从而让整个应用都有路由功能  
//const app = new Vue({ router:router }).$mount('#app');

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
    },
    template: '<App/>',
    components: { App },
    render: h => h(App),
    router:router
}).$mount('#app')
