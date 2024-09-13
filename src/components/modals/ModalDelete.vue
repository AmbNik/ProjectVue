<template>
  <v-dialog v-model="dialogDelete" max-width="400">
    <v-card>
      <v-card-title class="headline">Удалить элемент?</v-card-title>
      <v-card-text>
        Вы уверены, что хотите удалить
        <strong>{{ props.itemName }}</strong
        >? Это действие нельзя отменить.
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" text @click="$emit('delete-item')">Удалить</v-btn>
        <v-btn text @click="dialogDelete = false">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { useClipboard } from "@vueuse/core";

const dialogDelete = defineModel("dialogDelete");

const props = defineProps({
  itemName: String,
});
</script>
