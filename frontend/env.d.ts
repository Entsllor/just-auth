/// <reference types="vite/client" />
import type {Router} from "vue-router"

declare module "pinia" {
    interface PiniaCustomProperties {
        router: Router
    }
}
