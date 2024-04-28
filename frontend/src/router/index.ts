import {createRouter, createWebHistory} from "vue-router"
import FormLayout from "@/views/FormLayout.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: () => "sign-in",
            name: "index",
            components: {default: FormLayout},
            children: [
                {
                    path: "/sign-in",
                    name: "sign-in",
                    component: () => import("@/views/SignInView.vue")
                },
                {
                    path: "/sign-up",
                    name: "sign-up",
                    component: () => import("@/views/SignUpView.vue")
                }
            ]
        }
    ]
})

export default router
