<script setup lang="ts">
import PageHeader from "@/components/page-header.vue"
import PageFooter from "@/components/page-footer.vue"
</script>

<template>
    <div :class="$style.container">
        <PageHeader />
        <div :class="$style.content">
            <RouterView />
        </div>
        <PageFooter />
    </div>
</template>

<style module>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.content {
    flex: 1;
}
</style>
