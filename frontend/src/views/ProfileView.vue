<script setup lang="ts">
import {useAuthStore} from "@/stores/auth"

const store = useAuthStore()
</script>

<template>Hello, {{ store.username }}!</template>

<style module></style>
