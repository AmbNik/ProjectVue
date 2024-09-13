<template>
  <v-alert
    v-if="error"
    title="Ошибка сервера"
    type="error"
    variant="outlined"
    >{{ error.message }}</v-alert
  >
</template>

<script setup>
const error = defineModel("error");
</script>
