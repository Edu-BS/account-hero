import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {authStore} from './stores/auth'
import Nav from './components/NavBar.vue'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js"
// import "bootstrap/dist/js/bootstrap.esm"

const app = createApp(App)

app.use(createPinia())
app.component('NavComponent', Nav)
app.use(router)
app.config.globalProperties.$auth = authStore()
app.mount('#app')
