<template>
  <v-dialog v-model="props.dialogLoader" max-width="320" persistent>
    <v-list class="py-2" color="primary" elevation="12" rounded="lg">
      <v-list-item title="Выполнение операции">
        <template v-slot:append>
          <v-progress-circular
            color="primary"
            indeterminate="disable-shrink"
            size="16"
            width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script setup>
const props = defineProps({ dialogLoader: Boolean });
</script>
