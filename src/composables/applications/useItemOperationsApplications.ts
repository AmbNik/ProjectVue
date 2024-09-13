import { ref, computed } from "vue";
import { useApplicationsApi } from "./useApplicationsApi";

export function useItemOperationsApplications() {
  const {
    data,
    addApplications,
    updateApplicationsUse,
    deleteApplicationsUse,
    getApplications,
  } = useApplicationsApi();

  onMounted(async () => {
    try {
      await getApplications();
    } catch (e) {
      console.error("Ошибка при загрузке сервисов:", e);
    }
  });

  const handleSuccess = (message: string) => {
    snackbarMessage.value = message;
    snackbarColor.value = "green-darken-1";
    success.value = true;
    setTimeout(() => (success.value = false), 5000);
  };

  const handleError = (message: string) => {
    snackbarMessage.value = message;
    snackbarColor.value = "red-darken-1";
    console.error(message);
  };

  const applications = computed(() => data.value?.data || []);

  const dialogLoader = ref(false);
  const success = ref(false);
  const snackbarMessage = ref("");
  const snackbarColor = ref("");

  const dialogEdit = ref(false);
  const dialogInfo = ref(false);
  const dialogAdd = ref(false);
  const dialogDelete = ref(false);

  const addItem = async (newItem: any) => {
    dialogLoader.value = true;
    success.value = false;
    try {
      const response = await addApplications(newItem);
      newItem.id = response.id;
      applications.value.push(newItem);
      handleSuccess(`Запись ${newItem.name} успешно добавлена`);
      dialogAdd.value = false;
      return response;
    } catch (error) {
      handleError("Ошибка при добавлении сервиса");
    } finally {
      dialogLoader.value = false;
    }
  };

  const editItem = async (selectedItem: any) => {
    dialogLoader.value = true;
    success.value = false;

    try {
      await updateApplicationsUse(selectedItem.id, selectedItem);
      const index = applications.value.findIndex(
        (service: any) => service.id === selectedItem.id
      );
      if (index !== -1) {
        applications.value[index] = selectedItem;
      }

      handleSuccess(`Запись ${selectedItem.name} успешно изменена`);
      dialogEdit.value = false;
    } catch (error) {
      handleError("Ошибка при редактировании сервиса");
    } finally {
      dialogLoader.value = false;
    }
  };

  const deleteItemConfirmed = async (selectedItem: any) => {
    dialogLoader.value = true;
    success.value = false;
    try {
      dialogDelete.value = false;
      await deleteApplicationsUse(selectedItem.id);
      const index = applications.value.findIndex(
        (service: any) => service.id === selectedItem.id
      );
      if (index !== -1) {
        applications.value.splice(index, 1);
      }
      handleSuccess(`Запись ${selectedItem.name} успешно удалена`);
    } catch (error) {
      handleError("Ошибка при удалении сервиса");
    } finally {
      dialogLoader.value = false;
    }
  };

  return {
    dialogLoader,
    success,
    snackbarMessage,
    snackbarColor,
    addItem,
    editItem,
    deleteItemConfirmed,
    dialogEdit,
    dialogInfo,
    dialogAdd,
    dialogDelete,
    applications,
  };
}
