<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card
      ><v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <slot name="body"></slot>
      </v-card-text>
      <v-card-actions> <slot name="actions"></slot> </v-card-actions
    ></v-card>
  </v-dialog>
</template>
<script setup>
const dialog = defineModel("dialog");

const props = defineProps({
  title: String,
});
</script>
