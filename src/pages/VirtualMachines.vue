<template>
  <v-main style="margin-top: 100px">
    <v-container>
      <h1>Виртуальные машины</h1>
      <TagAccordion
        :items="virtualMachines"
        :isLoading="isLoading"
        :error="error"
        @update-selected-item="updateSelectedItem"
        @update-new-item="resetNewItem"
        v-model:dialogEdit="dialogEdit"
        v-model:dialogInfo="dialogInfo"
        @open-dialog-info="openDialogInfo"
        @add-item="AddItemOpenDialog"
        @open-dialog-delete="dialogDeleteSelectedItem"
      >
        <template v-slot:name="{ item }">
          <v-col class="text-truncate" style="max-width: 350px">
            {{ item.name }}
          </v-col>
        </template>

        <template v-slot:description="{ item }">
          <v-card-subtitle>{{ item.ip }}</v-card-subtitle>
          <v-card-text class="text-truncate" style="max-width: 350px">
            {{ item.description }}
          </v-card-text>
        </template>
      </TagAccordion>

      <ModalEditVM
        v-model:dialog="dialogEdit"
        :item="сopySelectedItem"
        :title="'Изменить элемент'"
        :virtualMachines="virtualMachineNames"
        :uniqueTagsList="uniqueTagsList"
        :validationRules="validationRules"
        @save-items="handleSave"
        @dialog-close="dialogClose"
        @validate-form="validateForm"
        :disabledSave="disabledSave"
      />
      <DialogLoader :dialogLoader="dialogLoader" />

      <ModalInfoVM
        v-model:dialogInfo="dialogInfo"
        :item="selectedItem"
        @copy-to-clipboard="copyToClipboard"
      />

      <ModalDelete
        v-model:dialogDelete="dialogDelete"
        :itemName="selectedItem.name"
        @delete-item="deleteSelectedItem"
      />

      <ModalAddVM
        v-model:dialogAdd="dialogAdd"
        :item="newItem"
        :title="'Добавить новый элемент'"
        :virtualMachines="virtualMachineNames"
        :uniqueTagsList="uniqueTagsList"
        :validationRules="validationRules"
        @add-item="addSelectedItem"
        @dialog-close="dialogClose"
        @validate-form="validateForm"
        :disabledSave="disabledSave"
      />

      <Snackbar
        v-model:success="success"
        :color="snackbarColor"
        :message="snackbarMessage"
      />
    </v-container>
  </v-main>
</template>
<script setup>
import { ref, computed, onMounted, nextTick, toRefs } from "vue";
import { useRouter } from "vue-router";

import DialogLoader from "@/components/modals/DialogLoader.vue";
import Snackbar from "@/components/UI/Snackbar.vue";
import Modal from "@/components/modals/Modal.vue";
import { useClipboard } from "@vueuse/core";

// import { useServicesApi } from "@/composables/useServicesApi";
import { useItemOperationsVirtualMachine } from "@/composables/virtualMachines/useItemOperationsVirtualMachine";

const virtualMachines = computed(() => virtualMachinesData.value || []);
const uniqueTagsList = computed(() => {
  const tags = new Set();

  virtualMachines.value.forEach((service) => {
    if (service.tags !== null) tags.add(service.tags);
  });

  const sortedTags = Array.from(tags).sort((a, b) => a.localeCompare(b));
  return sortedTags;
});

const copyText = ref("");
const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
const router = useRouter();

const {
  error,
  isLoading,
  virtualMachines: virtualMachinesData,
  dialogLoader,
  dialogEdit,
  success,
  snackbarMessage,
  snackbarColor,
  editItem,
  addItem,
  dialogAdd,
  dialogDelete,
  dialogInfo,
  deleteItemConfirmed,
} = useItemOperationsVirtualMachine();

const selectedItem = ref({
  id: "",
  name: "",
  ip: "",
  login: "",
  password: "",
  tags: "",
});

const newItem = ref({
  id: "",
  name: "",
  ip: "",
  login: "",
  password: "",
  tags: "",
});

const openDialogInfo = (item) => {
  console.log("openDialogInfo", item);
  selectedItem.value = item;
  dialogInfo.value = true;
};

const AddItemOpenDialog = (tag) => {
  resetNewItem();
  if (tag == "Без тега") tag = null;
  newItem.value.tags = tag;
  dialogAdd.value = true;
};

const сopySelectedItem = ref({});
const updateSelectedItem = (item) => {
  console.log("я здесь", item);
  selectedItem.value = item;
  сopySelectedItem.value = ref({ ...item });
  dialogEdit.value = true;
};

const resetNewItem = () => {
  newItem.value = {
    id: "",
    name: "",
    ip: "",
    login: "",
    password: "",
    tags: "",
  };
};

const { copy } = useClipboard();

const copyToClipboard = async (text) => {
  if (text) {
    console.log("copyToClipboard", text);
    await navigator.clipboard.writeText(text);
    snackbarMessage.value = "Скопирован " + text + " в буфер обмена";
    snackbarColor.value = "blue-darken-3";
    success.value = true;
  }
};
const handleSave = (item) => {
  updateSelectedItem(item);
  editSelectedItem();
};
const ipv4Regex =
  /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
const ipv6Regex =
  /^((?:[0-9a-fA-F]{1,4}:){7}(?:[0-9a-fA-F]{1,4}|:)|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}|:(?::[0-9a-fA-F]{1,4}){1,7}|::)$/i;

// Функция для проверки IPv4
const isValidIPv4 = (ip) => {
  return ipv4Regex.test(ip);
};

const isValidIPv6 = (ip) => {
  return ipv6Regex.test(ip);
};

let disabledSave = ref(false);
// Функция валидации формы
const validateForm = (item) => {
  disabledSave.value =
    item.name.trim() !== "" &&
    item.ip.trim() !== "" &&
    (ipv4Regex.test(item.ip) || ipv6Regex.test(item.ip)) &&
    item.login.trim() !== "" &&
    item.password.trim() !== "";
  return disabledSave.value;
};

// Определите правила валидации
const validationRules = {
  name: (v) => !!v || "name обязательно",
  ip: [
    (v) => !!v || "IP-адрес обязателен",
    (v) =>
      isValidIPv4(v) ||
      isValidIPv6(v) ||
      "Некорректный IP-адрес. Например, 192.168.200.57 или 2001:db8::ff00:42:8329",
  ],
  login: (v) => !!v || "login обязательно",
  password: (v) => !!v || "password обязательно",
};

const editSelectedItem = async () => {
  await editItem(selectedItem.value);
};

const addSelectedItem = async () => {
  await addItem(newItem.value);
};

const dialogDeleteSelectedItem = (item) => {
  selectedItem.value = item;
  dialogDelete.value = true;
};

const deleteSelectedItem = async () => {
  console.log("selectedItem.value", selectedItem.value);
  await deleteItemConfirmed(selectedItem.value);
};

const dialogClose = () => {
  dialogEdit.value = false;
};
</script>

<style></style>
