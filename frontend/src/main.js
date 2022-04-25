import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {authStore} from './stores/auth'
import NavComponent from './components/NavComponent.vue'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js"
// import "bootstrap/dist/js/bootstrap.esm"

const app = createApp(App)

app.component('NavComponent', NavComponent)
app.use(createPinia())
app.config.globalProperties.$auth = authStore()
app.use(router)
app.mount('#app')
