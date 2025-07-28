import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import ToastPlugin from 'vue-toast-notification'

const app = createApp(App)
app.use(ToastPlugin, {
  position: 'top-right',
  duration: 5000,
  dismissible: true,
  pauseOnHover: true,
  closeOnClick: false, // Prevents accidental closes
  queue: true,
  maxToasts: 3,
})

// app.use(Toast)
app.use(router)

app.mount('#app')
