<script setup>
defineProps({
    value: {
    type: String,
    required: true
    },
    text: {
    type: String,
    required: true
    }
})
</script>

<template>
    <option :value="value">{{ text }}</option>
</template>

<style scoped>
</style>
