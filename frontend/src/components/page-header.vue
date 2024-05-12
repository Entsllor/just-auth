<script setup lang="ts">
import Avatar from "primevue/avatar"
import Menubar from "primevue/menubar"
import {useAuthStore} from "@/stores/auth"

const store = useAuthStore()
</script>

<template>
    <header :class="$style.header">
        <Menubar>
            <template #start>
                <span :class="$style.title">
                    <span :class="$style.titleMain">Just</span>
                    <span :class="$style.titleRest">Auth</span>
                </span>
            </template>
            <template #end>
                <Avatar :label="store.username?.charAt(0)" />
            </template>
        </Menubar>
    </header>
</template>

<style module>
.title {
    font-size: var(--space-md);
    font-family: var(--font-family);
    font-weight: var(--text-bold);
}

.titleRest {
    color: var(--c-primary);
}
</style>
