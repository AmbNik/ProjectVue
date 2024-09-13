<template>
  <Modal v-model:dialog="dialog" :title="title">
    <template v-slot:body>
      <v-text-field
        label="Название"
        v-model="props.item.value.name"
        :rules="[validationRules.name]"
        required
        class="mb-4"
        dense
      ></v-text-field>
      <v-text-field
        label="URL"
        v-model="props.item.value.url"
        :rules="validationRules.url"
        required
        class="mb-4"
      ></v-text-field>
      <v-textarea
        label="Описание"
        v-model="props.item.value.description"
        dense
        auto-grow
      ></v-textarea>
      <v-text-field
        label="Логин"
        v-model="props.item.value.login"
        :rules="[validationRules.login]"
        dense
        required
        class="mb-4"
      ></v-text-field>
      <v-text-field
        label="Пароль"
        required
        v-model="props.item.value.password"
        :type="passwordVisible ? 'text' : 'password'"
        :rules="[validationRules.password]"
        dense
        class="mb-4"
      >
        <template v-slot:append-inner>
          <v-btn variant="text" icon @click="togglePasswordVisibility">
            <v-icon>
              {{ passwordVisible ? "mdi-eye-off" : "mdi-eye" }}
            </v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <v-combobox
        label="Теги"
        v-model="props.item.value.tags"
        :items="uniqueTagsList"
      ></v-combobox>
      <v-select
        label="Виртуальная машина"
        v-model="props.item.value.virtual_machine"
        :items="virtualMachines"
        item-value="id"
        item-title="name"
        dense
        class="mb-4"
      ></v-select>
    </template>
    <template v-slot:actions>
      <v-btn
        text
        @click="$emit('save-items', props.item.value)"
        :disabled="!validateForm(props.item.value)"
        >Сохранить</v-btn
      >
      <v-btn text @click="$emit('dialog-close')">Закрыть</v-btn>
    </template>
  </Modal>
</template>

<script setup>
import { ref, watch } from "vue";
const dialog = defineModel("dialog");
// const item = defineModel("copySelectedItem");

const props = defineProps({
  item: Object,
  title: String,
  virtualMachines: Object,
  uniqueTagsList: Array,
  validationRules: Object,
  disabledSave: Boolean,
});

const validateForm = (item) => {
  emit("validate-form", item);
  return props.disabledSave;
};

const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const emit = defineEmits(["validate-form"]);
</script>
