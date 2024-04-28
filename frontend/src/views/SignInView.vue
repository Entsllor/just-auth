<script setup lang="ts">
import Password from "primevue/password"
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import Divider from "primevue/divider"
import {computed, ref} from "vue"
import formsStyles from "@/assets/forms.module.css"

const password = ref("")
const email = ref("")
const canSubmit = computed(() => !!password.value && !!email.value)

function submit(): void {}
</script>

<template>
    <form @submit.prevent="submit">
        <h1 :class="formsStyles.header">Sign In</h1>
        <div :class="formsStyles.fields">
            <div :class="formsStyles.field">
                <label for="email">Email</label>
                <InputText
                    v-model.trim="email"
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                />
            </div>
            <div :class="formsStyles.field">
                <label for="password">Password</label>
                <Password
                    v-model="password"
                    placeholder="Enter your password"
                    :feedback="false"
                    toggle-mask
                    input-id="password"
                    input-class="w-100"
                />
            </div>
        </div>
        <Divider />

        <footer :class="formsStyles.footer">
            <Button
                type="submit"
                label="Continue"
                :disabled="!canSubmit"
                :class="formsStyles.button"
            />

            <RouterLink to="sign-up">
                <Button
                    link
                    label="create account"
                />
            </RouterLink>
        </footer>
    </form>
</template>
