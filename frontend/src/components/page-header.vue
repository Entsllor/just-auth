<script setup lang="ts"></script>

<template>
    <header :class="$style.header">
        <span :class="$style.title">
            <i class="pi pi-lock"></i>
            <span :class="$style.titleMain">Just</span>
            <span :class="$style.titleRest">Auth</span>
        </span>
    </header>
</template>

<style module>
.header {
    min-height: var(--size-xxxs);
    background-color: var(--c-bg-secondary);
    display: flex;
    align-items: center;
}

.title {
}

.titleMain {
    color: var(--c-primary);
}

.titleRest {
    color: var(--c-text-secondary);
}
</style>
