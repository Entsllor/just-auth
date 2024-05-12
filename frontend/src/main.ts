import "./assets/main.css"
import "primevue/resources/themes/aura-light-green/theme.css"

import {createPersistedState} from "pinia-plugin-persistedstate"
import {createApp, markRaw} from "vue"
import {createPinia} from "pinia"
import PrimeVue from "primevue/config"
import App from "./App.vue"
import router from "./router"

const app = createApp(App)
const pinia = createPinia()

pinia.use(({store}) => {
    store.router = markRaw(router)
})
pinia.use(createPersistedState({auto: true}))
app.use(pinia)
app.use(router)
app.use(PrimeVue)

app.mount("#app")
