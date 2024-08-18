/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import { io } from 'socket.io-client'
const socket = io('http://localhost:3000') // 連接到你的後端伺服器

const app = createApp(App)

app.config.globalProperties.$socket = socket

registerPlugins(app)
app.mount('#app')
