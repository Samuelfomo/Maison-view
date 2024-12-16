import { createRouter, createWebHistory } from 'vue-router';
import Subscriber from "../../public/subscriber.vue";
import Home from "../../public/home.vue";
const routes = [

    {
        path: '/',
        name: 'home',
        component: Home
},
    {
        path: '/:shortlink?',
        name: 'Subscriber',
        component: Subscriber,
        props: true,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
