<template>
  <v-sheet class="d-flex flex-column">
    <v-snackbar v-model="success" :color="color" class="align-start pt-10">
      <p class="text-h5">
        <slot name="message">{{ message }} </slot>
      </p>
    </v-snackbar>
  </v-sheet>
</template>

<script setup>
const success = defineModel("success");
const props = defineProps({
  color: {
    type: String,
    default: "green-darken-1",
  },
  message: {
    type: String,
    default: "",
  },
});
</script>
