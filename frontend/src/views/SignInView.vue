<script setup lang="ts">
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Divider from "primevue/divider";
import {ref} from "vue";

const password = ref("");
const email = ref("");

function submit(): void {
    console.log(password.value);
}
</script>

<template>
    <form @submit.prevent="submit">
        <div :class="$style.field">
            <label for="email">Email</label>
            <InputText v-model="email" type="email" id="email" placeholder="Enter your email" />
        </div>
        <div :class="$style.field">
            <label for="password">Password</label>
            <Password v-model="password" placeholder="Enter your password" toggle-mask input-id="password"
                      input-class="w-100" />
        </div>
        <Divider />

        <footer :class="$style.footer">
            <Button type="submit" label="Sign in" :class="$style.button" />

            <RouterLink to="sign-up">
                <Button link label="create account" />
            </RouterLink>

        </footer>
    </form>
</template>

<style module>
.button {
    width: 100%;
}

.field {
    display: flex;
    flex-direction: column;
}

.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>