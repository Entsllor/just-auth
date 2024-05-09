import "./assets/main.css"
import "primevue/resources/themes/aura-light-cyan/theme.css"

import {createPersistedState} from "pinia-plugin-persistedstate"
import {createApp, markRaw} from "vue"
import {createPinia} from "pinia"
import PrimeVue from "primevue/config"
import App from "./App.vue"
import router from "./router"
import type {Router} from "vue-router"

const app = createApp(App)
const pinia = createPinia()

declare module "pinia" {
    interface PiniaCustomProperties {
        router: Router
    }
}

pinia.use(({store}) => {
    store.router = markRaw(router)
})
pinia.use(createPersistedState({auto: true}))
app.use(pinia)
app.use(router)
app.use(PrimeVue)

app.mount("#app")
