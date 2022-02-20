import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import 'mosha-vue-toastify/dist/style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import VueGtag from 'vue-gtag'
import Popup from './views/Popup.vue'

library.add(fas, fab)

const createPopup = () => createApp(Popup)

const createMainApp = () => createApp(App)

const isPopup = window.location.hash.startsWith('#/popup')

const app = isPopup ? createPopup() : createMainApp()

app.use(VueGtag, {
  config: {
    id: 'G-GZ7KYSY3TM',
  },
})

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store)

if (!isPopup) {
  app.use(router)
}

app.mount('#app')
