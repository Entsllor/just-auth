<script setup lang="ts">
import Password from "primevue/password"
import Divider from "primevue/divider"
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import {computed, ref} from "vue"
import formsStyles from "@/assets/forms.module.css"

function submit() {}

const password = ref("")
const confirmPassword = ref("")
const email = ref("")

const hasPasswordMismatch = computed(
    () => !!confirmPassword.value && !!password.value && password.value !== confirmPassword.value
)
const passwordHasLeadingSpace = computed(() => /^.*\s$/.test(password.value))
const passwordHasTrailingSpace = computed(() => /^\s.*$/.test(password.value))
const canSubmit = computed(
    () => !!email.value && !!password.value && !!confirmPassword.value && !hasPasswordMismatch.value
)
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
                    toggle-mask
                    :feedback="false"
                    input-id="confirmPassword"
                    input-class="w-100"
                    :invalid="hasPasswordMismatch"
                />
                <small
                    :class="formsStyles.invalid"
                    v-if="hasPasswordMismatch"
                    >Passwords don't match</small
                >
            </div>
        </div>
        <Divider />
        <footer :class="formsStyles.footer">
            <Button
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
