<template>
  <Modal v-model:dialog="dialogInfo" :title="props.item?.name">
    <template v-slot:body>
      <p><strong>ip:</strong> {{ item?.ip }}</p>
      <p>
        <strong>Логин:</strong>
        {{ item.login }}
        <v-icon
          @click="$emit('copy-to-clipboard', item?.login)"
          class="ml-2 small-icon"
        >
          mdi-content-copy
        </v-icon>
      </p>
      <p>
        <strong>Пароль:</strong>
        {{ item?.password }}
        <v-icon
          @click="$emit('copy-to-clipboard', item?.password)"
          class="ml-2 small-icon"
        >
          mdi-content-copy
        </v-icon>
      </p>
      <p><strong>Теги:</strong> {{ item?.tags }}</p>
    </template>

    <template v-slot:actions>
      <v-btn text @click="dialogInfo = false">Закрыть</v-btn>
    </template>
  </Modal>
</template>

<script setup>
const dialogInfo = defineModel("dialogInfo");
const props = defineProps({
  item: Object,
});
</script>
