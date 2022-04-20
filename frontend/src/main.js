import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {authStore} from './stores/auth'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$auth = authStore()
app.mount('#app')
