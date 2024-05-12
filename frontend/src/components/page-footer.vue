<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer :class="$style.footer">@Entsllor {{ currentYear }}</footer>
</template>

<style module>
.footer {
    color: var(--c-text-secondary);
    text-align: center;
}
</style>
