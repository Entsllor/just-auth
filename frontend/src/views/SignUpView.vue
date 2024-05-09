<script setup lang="ts">
import Password from "primevue/password"
import Divider from "primevue/divider"
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import {computed, ref} from "vue"
import formsStyles from "@/assets/forms.module.css"
import {useAction} from "@/hooks/use-action"
import AlertMessage from "@/components/AlertMessage.vue"
import {useAuthStore} from "@/stores/auth"

// states
const password = ref("")
const confirmPassword = ref("")
const email = ref("")
const username = ref("")

// form errors
const hasPasswordMismatch = computed(
    () => !!confirmPassword.value && password.value !== confirmPassword.value
)
const passwordTooShort = computed(() => password.value.length < 8)
const usernameTooShort = computed(() => username.value.length < 5)
const invalidEmail = computed(() => !/.+@.+/.test(email.value))

// form warnings
const passwordHasLeadingSpace = computed(() => /^.*\s$/.test(password.value))
const passwordHasTrailingSpace = computed(() => /^\s.*$/.test(password.value))

// actions
const store = useAuthStore()
const {error, pending, act: signup} = useAction(store.signUp)
const canSubmit = computed(() =>
    [invalidEmail, hasPasswordMismatch, passwordTooShort, usernameTooShort].every(ref => !ref.value)
)

function submit() {
    signup({
        email: email.value,
        password: password.value,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        username: username.value
    })
}
</script>

<template>
    <form @submit.prevent="submit">
        <h1 :class="formsStyles.header">Sign Up</h1>
        <div :class="formsStyles.fields">
            <div :class="formsStyles.field">
                <label for="email">Email</label>
                <InputText
                    v-model.trim="email"
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                />
                <small
                    v-if="email && invalidEmail"
                    :class="formsStyles.invalid"
                    >Invalid email</small
                >
            </div>
            <div :class="formsStyles.field">
                <label for="username">Username</label>
                <InputText
                    v-model.trim="username"
                    id="username"
                    placeholder="Enter your username"
                />
                <small
                    v-if="username && usernameTooShort"
                    :class="formsStyles.invalid"
                    >Username is too short
                </small>
            </div>
            <div :class="formsStyles.field">
                <label for="password">Password</label>
                <Password
                    v-model="password"
                    placeholder="Enter your password"
                    toggle-mask
                    input-id="password"
                    input-class="w-100"
                />
                <small
                    v-if="password && passwordTooShort"
                    :class="formsStyles.invalid"
                    >Password is too short
                </small>
                <small
                    v-if="passwordHasTrailingSpace"
                    :class="formsStyles.warn"
                    >Password contains trailing space</small
                >
                <small
                    v-if="passwordHasLeadingSpace"
                    :class="formsStyles.warn"
                    >Password contains leading space</small
                >
            </div>
            <div :class="formsStyles.field">
                <label for="confirmPassword">Confirm password</label>
                <Password
                    v-model="confirmPassword"
                    placeholder="Repeat your password"
                    minlength="8"
                    toggle-mask
                    :feedback="false"
                    input-id="confirmPassword"
                    input-class="w-100"
                    :invalid="hasPasswordMismatch"
                />
                <small
                    :class="formsStyles.invalid"
                    v-if="hasPasswordMismatch"
                    >Passwords don't match
                </small>
            </div>
        </div>
        <AlertMessage :model-value="error" />
        <Divider />
        <footer :class="formsStyles.footer">
            <Button
                :loading="pending"
                :disabled="!canSubmit"
                type="submit"
                label="Continue"
                :class="formsStyles.button"
            />

            <RouterLink to="sign-in">
                <Button
                    link
                    label="I already have an account"
                />
            </RouterLink>
        </footer>
    </form>
</template>
