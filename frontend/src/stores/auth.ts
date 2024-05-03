import {defineStore} from "pinia"
import type {AuthStateDto} from "@/api/generated"

export const useAuthStore = defineStore("auth", {
    state: (): Partial<AuthStateDto> => ({}),
    getters: {
        isAuthorized: state => !!state.accessToken
    }
})
