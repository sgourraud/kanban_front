import Vue from 'vue'
import VueRouter from 'vue-router'

import Developers from '../components/Developers.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Developers
    },
]

export default new VueRouter({
    routes
  })
  