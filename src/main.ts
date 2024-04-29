import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './global/styles/global.scss'
import { createVuetify } from 'vuetify' 
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'


const pinia = createPinia()
const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
})

app.use(pinia)
app.use(vuetify)
app.mount('#app')
