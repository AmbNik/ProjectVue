<template>
  <v-main style="margin-top: 100px">
    <v-container>
      <h1>Приложения</h1>

      <TagAccordion
        :items="applications"
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
          <v-card-subtitle>{{ item.url }}</v-card-subtitle>
          <v-card-text class="text-truncate" style="max-width: 350px">
            {{ item.description }}
          </v-card-text>
        </template>
      </TagAccordion>
      <!-- //dialogEdit -->
      <ModalEdit
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
      <!-- dialogInfo -->
      <ModalInfo
        v-model:dialogInfo="dialogInfo"
        :item="selectedItem"
        :virtualMachines="virtualMachines"
        @copy-to-clipboard="copyToClipboard"
      />
      <!-- dialogAdd -->
      <ModalAdd
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

      <ModalDelete
        v-model:dialogDelete="dialogDelete"
        :itemName="selectedItem.name"
        @delete-item="deleteSelectedItem"
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
import { useApplicationsApi } from "@/composables/applications/useApplicationsApi";
import { useItemOperationsApplications } from "@/composables/applications/useItemOperationsApplications";

const virtualMachines = computed(() => virtualMachinesData.value?.data || []);

const virtualMachineNames = computed(
  () =>
    virtualMachinesData.value?.data.map((vm) => ({
      id: vm.id,
      name: vm.name,
    })) || []
);

const uniqueTagsList = computed(() => {
  const tags = new Set();

  applications.value.forEach((service) => {
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
  data,
  isLoading,
  error,
  getApplications,
  addApplications,
  updateApplicationsUse,
  deleteApplicationsUse,
  virtualMachinesData,
  getVirtualMachines,
} = useApplicationsApi();

const {
  applications,
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
} = useItemOperationsApplications();

onMounted(async () => {
  try {
    await Promise.all([getApplications(), getVirtualMachines()]);
  } catch (e) {
    console.error("Ошибка при загрузке данных:", e);
    throw e;
  }
});

console.log("virtualMachineNames", virtualMachineNames);

const getVirtualMachineIdByName = (id) => {
  console.log("id", id);
  const vm = virtualMachinesData.value?.data.find((vm) => vm.id === id);
  return vm ? vm.name : "не указано";
};

const selectedItem = ref({
  id: "",
  name: "",
  url: "",
  description: "",
  login: "",
  password: "",
  tags: "",
  virtual_machine: "",
});

console.log("selectedItem", selectedItem);

const newItem = ref({
  id: "",
  name: "",
  url: "",
  description: "",
  login: "",
  password: "",
  tags: "",
  virtual_machine: "",
});

const openDialogInfo = (item) => {
  console.log("openDialogInfo", item);
  selectedItem.value = item;
  success.value = false;
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
    url: "",
    description: "",
    login: "",
    password: "",
    tags: "",
    virtual_machine: "",
  };
};

const { copy } = useClipboard();

const copyToClipboard = async (text) => {
  if (text) {
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

let disabledSave = ref(false);
const validateForm = (item) => {
  console.log("item", item);
  disabledSave.value =
    item.name.trim() !== "" &&
    item.url.trim() !== "" &&
    /^https?:\/\/\S+\.\S+/g.test(item.url) &&
    item.login.trim() !== "" &&
    item.password.trim() !== "" &&
    !isNaN(item.virtual_machine);
  return disabledSave.value;
};

const validationRules = {
  name: (v) => !!v || "name обязательно",
  login: (v) => !!v || "login обязательно",
  password: (v) => !!v || "password обязательно",
  url: [
    (v) => !!v || "URL обязателен",
    (v) =>
      /^https?:\/\/\S+\.\S+/g.test(v) ||
      "Некорректный формат URL. Например, https://example.com",
  ],
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
