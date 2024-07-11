<script setup lang="ts">
import { useAuthStore } from "@/stores/auth"
import Avatar from "primevue/avatar"
import PageContent from "@/components/page-content.vue"
import TabMenu from "primevue/tabmenu";
import type { MenuItem } from "primevue/menuitem";
import { useRoute, useRouter } from "vue-router";
import { Pages } from "@/types/router";
import { ref } from "vue";
import InputText from "primevue/inputtext";

const router = useRouter()
const user = useAuthStore()

const tabs: MenuItem[] = [
    { label: 'Profile', key: Pages.Profile, command: () => router.push({ name: Pages.Profile }) },
    { label: 'Sessions', key: Pages.Sessions, command: () => router.push({ name: Pages.Sessions }) },
    { label: 'Integrations', key: Pages.Integrations, command: () => router.push({ name: Pages.Integrations }) }
]

const route = useRoute()
const tabIndex = ref(Math.max(tabs.findIndex(tab => tab.key === route.name), 0))

const store = useAuthStore()
</script>

<template>
    <PageContent hide-header>
        <TabMenu :model="tabs" :active-index="tabIndex"></TabMenu>
        <RouterView />
        <template v-if="route.name === Pages.Profile">
            <Avatar shape="circle" size="xlarge" :label="store.username?.charAt(0)" />
            <InputText placeholder="username" disabled v-model="user.username" />
        </template>
    </PageContent>
</template>

<style module></style>
