import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router/routers'
import VueCookie from 'vue-cookie'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(router, VueCookie).mount('#app')

