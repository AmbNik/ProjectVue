<template>
  <Modal v-model:dialog="dialogAdd" :title="title">
    <template v-slot:body>
      <v-text-field
        label="Название"
        v-model="props.item.name"
        :rules="[validationRules.name]"
        required
        class="mb-4"
        dense
      ></v-text-field>
      <v-text-field
        label="ip"
        v-model="props.item.ip"
        :rules="validationRules.ip"
        required
        class="mb-4"
      ></v-text-field>
      <v-text-field
        label="Логин"
        v-model="props.item.login"
        :rules="[validationRules.login]"
        dense
        required
        class="mb-4"
      ></v-text-field>
      <v-text-field
        label="Пароль"
        required
        v-model="props.item.password"
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
        v-model="props.item.tags"
        :items="uniqueTagsListModal"
      ></v-combobox>
    </template>

    <template v-slot:actions>
      <v-btn
        text
        @click="$emit('add-item')"
        :disabled="!validateForm(props.item)"
        >Добавить</v-btn
      >
      <v-btn text @click="dialogAdd = false">Закрыть</v-btn>
    </template>
  </Modal>
</template>

<script setup>
const dialogAdd = defineModel("dialogAdd");

const props = defineProps({
  item: Object,
  title: String,
  virtualMachines: Object,
  uniqueTagsList: Array,
  validationRules: Object,
  disabledSave: Boolean,
});

const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const validateForm = (item) => {
  emit("validate-form", item);
  return props.disabledSave;
};

const emit = defineEmits(["validate-form"]);
</script>
