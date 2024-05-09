<script setup lang="ts">
import {useAuthStore} from "@/stores/auth"
import {useAction} from "@/hooks/use-action"

const store = useAuthStore()
const {act: logout} = useAction(store.logout)
</script>

<template>Hello, {{ store.username }}!</template>

<style module></style>
