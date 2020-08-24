import Vue from 'vue'
import VueRouter from 'vue-router'

//components
import Home from "../components/pages/Home.vue";
import Edit from "../components/pages/Edit.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/note/:key',
        component: Edit
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
