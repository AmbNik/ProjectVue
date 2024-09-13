<template>
  <v-text-field
    v-model="searchQuery"
    append-icon="mdi-magnify"
    label="Поиск"
    single-line
    hide-details
  ></v-text-field>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";

// Emit updated search query to parent component
const emit = defineEmits(["update:searchQuery"]);

const searchQuery = ref("");

// Watch the searchQuery and emit the updated value
watch(searchQuery, (newQuery) => {
  emit("update:searchQuery", newQuery);
});
</script>
