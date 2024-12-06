import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'core-js/es/promise'

const app = createApp(App)
app.use(router)
app.mount('#app')

// createApp(App).mount('#app')
