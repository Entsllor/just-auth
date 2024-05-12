<script setup lang="ts">
import Panel from "primevue/panel"
import {cn} from "@/utils/styles"

const {hideHeader} = defineProps({hideHeader: {type: Boolean, default: false}})
</script>

<template>
    <div :class="$style.container">
        <Panel :class="cn($style.panel, hideHeader && $style.hideHeader)">
            <template
                #header
                v-if="!hideHeader"
            >
                <slot name="header" />
            </template>
            <slot />
        </Panel>
    </div>
</template>

<style module>
.hideHeader :global(.p-panel-header) {
    display: none;
}

.panel {
    margin-top: var(--space-md);
    width: var(--width-container);
    height: var(--space-xxxxl);
}

.container {
    display: flex;
    justify-content: center;
}
</style>
