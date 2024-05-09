import {defineStore} from "pinia"
import type {AuthStateDto, LoginDto, SignupDto} from "@/api/generated"
import {api} from "@/api/client"
import {Pages} from "@/types/router"

export const useAuthStore = defineStore("auth", {
    state: (): Partial<AuthStateDto> => ({
        accessToken: undefined,
        id: undefined,
        email: undefined,
        lastName: undefined,
        firstName: undefined,
        secondName: undefined,
        createdAt: undefined,
        timezone: undefined,
        username: undefined
    }),
    getters: {
        isAuthorized: state => !!state.accessToken
    },
    actions: {
        async signUp(data: SignupDto) {
            await api.auth.signup(data)
            await this.router.push({name: Pages.SignIn})
        },
        async login(data: LoginDto) {
            await api.auth.login(data).then(this.$patch)
            await this.router.push({name: Pages.Profile})
        },
        async logout() {
            await api.auth.logout()
            this.$reset()
            await this.router.push({name: Pages.SignIn})
        }
    }
})
