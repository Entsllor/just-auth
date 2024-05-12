<script setup lang="ts">
import {useAuthStore} from "@/stores/auth"
import PageContent from "@/components/page-content.vue"

const store = useAuthStore()
</script>

<template>
    <PageContent hide-header> </PageContent>
</template>

<style module>
.img {
    object-fit: cover;
}
</style>
