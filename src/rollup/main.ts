import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './home/'
import Hello from './hello'
import app from './app.vue'
// import  _ from  'lodash'
// import 'lodash'
// console.log('Backbone',Backbone);
// console.log('lo',_.merge({},{}));

Vue.use(VueRouter)
const config = {
    linkActiveClass: 'active',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
        { path: '/home', component: Home },
        { path: '/hello', component: Hello },
        { path: '*', redirect: '/home' }
    ]
}
app.router = new VueRouter(config)
new Vue(app).$mount('#app')
