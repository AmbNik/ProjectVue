<template>
  <Modal v-model:dialog="dialogInfo" :title="props.item?.name">
    <v-card-subtitle>{{ props.item?.url }}</v-card-subtitle>

    <template v-slot:body>
      <p><strong>Описание:</strong> {{ props.item?.description }}</p>
      <p>
        <strong>Логин:</strong>
        {{ props.item?.login }}
        <v-icon
          @click="$emit('copy-to-clipboard', props.item?.login)"
          class="ml-2 small-icon"
        >
          mdi-content-copy
        </v-icon>
      </p>
      <p>
        <strong>Пароль:</strong>
        {{ props.item?.password }}
        <v-icon
          @click="$emit('copy-to-clipboard', props.item?.password)"
          class="ml-2 small-icon"
        >
          mdi-content-copy
        </v-icon>
      </p>
      <p><strong>Теги:</strong> {{ props.item?.tags }}</p>
      <p>
        <strong>Виртуальная машина:</strong>
        {{ getVirtualMachineIdByName(props.item?.virtual_machine) }}
      </p>
    </template>

    <template v-slot:actions>
      <v-btn text @click="dialogInfo = false">Закрыть</v-btn>
    </template>
  </Modal>
</template>

<script setup>
import Modal from "@/components/modals/Modal.vue";
const dialogInfo = defineModel("dialogInfo");
const props = defineProps({
  item: Object,
  virtualMachines: Object,
});

const getVirtualMachineIdByName = (id) => {
  console.log("id", id);
  const vm = props.virtualMachines.find((vm) => vm.id === id);
  return vm ? vm.name : "не указано";
};
</script>
