import {createRouter, createWebHistory} from "vue-router"
import FormLayout from "@/views/FormLayout.vue"
import {Pages} from "@/types/router"
import PrivateView from "@/views/PrivateView.vue"
import {useAuthStore} from "@/stores/auth"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: () => ({name: Pages.SignIn}),
            name: Pages.Index,
            components: {default: FormLayout},
            children: [
                {
                    path: "/sign-in",
                    name: Pages.SignIn,
                    component: () => import("@/views/SignInView.vue")
                },
                {
                    path: "/sign-up",
                    name: Pages.SignUp,
                    component: () => import("@/views/SignUpView.vue")
                }
            ]
        },
        {
            path: "/__private__",
            redirect: () => ({name: Pages.Profile}),
            beforeEnter: () => {
                const store = useAuthStore()
                if (!store.isAuthorized) {
                    return {name: Pages.SignIn}
                }
            },
            components: {default: PrivateView},
            children: [
                {
                    path: "/profile",
                    name: Pages.Profile,
                    component: () => import("@/views/ProfileView.vue")
                }
            ]
        }
    ]
})

export default router
