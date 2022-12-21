import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import Menu from '../components/Menu.vue'
import CreateMenu from '../components/CreateMenu.vue'
import EditMenu from '../components/EditMenu.vue'
const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'Profile',
        component: Profile,
        path: `/profile`
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up'
    },
    {
        name: 'Login',
        component: Login,
        path: '/login'
    },
    {
        name: 'Menu',
        component: Menu,
        path: '/list-menu'
    },
    {
        name: 'CreateMenu',
        component: CreateMenu,
        path: '/create-menu'
    },
    {
        name: 'Edit',
        component: EditMenu,
        path: '/edit-menu/:id'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router