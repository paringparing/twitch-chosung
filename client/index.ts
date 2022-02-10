import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import 'mosha-vue-toastify/dist/style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store)

app.use(router)

app.mount('#app')
