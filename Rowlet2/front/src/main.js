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

import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const app = createApp(App)

app.use(setupCalendar, {})
app.component('V2Calendar', Calendar)
app.component('V2DatePicker', DatePicker)

registerPlugins(app)
app.mount('#app')
