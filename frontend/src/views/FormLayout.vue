<script setup lang="ts">
import Panel from "primevue/panel"
</script>

<template>
    <div :class="$style.wrapper">
        <div :class="$style.container">
            <Panel :class="$style.panel">
                <RouterView />
            </Panel>
        </div>
    </div>
</template>

<style module>
.wrapper {
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--c-bg-secondary);
}

.container {
    padding: var(--space-xxxl) 0;
    height: 100%;
    width: 100%;
    flex-grow: 1;
    max-width: var(--width-xl);
}

.panel {
    transition: max-height var(--smooth);
}

.panel > :global(.p-panel-header) {
    display: none;
}
</style>
