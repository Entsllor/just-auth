<script setup lang="ts">
import Message from "primevue/message"

const {variant} = withDefaults(
    defineProps<{
        variant?: "success" | "info" | "warn" | "error" | "secondary" | "contrast"
    }>(),
    {variant: "error"}
)
const model = defineModel<string>({required: true})
</script>

<template>
    <Message
        v-if="model"
        :severity="variant"
        :class="$style.visible"
        @close="model = ''"
        >{{ model }}
    </Message>
</template>

<style module>
.visible {
    display: block !important;
}
</style>
