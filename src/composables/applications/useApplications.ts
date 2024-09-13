import { ref } from "vue";
import applicationsApi from "@/api/applications";

export function useApplications() {
  const isLoading = ref<boolean>(false);
  const data = ref<any | null>(null);
  const error = ref<null>(null);

  const getApplicationsStart = () => {
    isLoading.value = true;
    data.value = null;
  };

  const getApplicationsSuccess = (items: any) => {
    isLoading.value = false;
    data.value = items;
  };

  const getApplicationsFailure = (errors: any) => {
    isLoading.value = false;
    error.value = errors;
  };

  const getApplications = async (): Promise<any> => {
    try {
      getApplicationsStart();
      const applications = await applicationsApi.getApplications();
      getApplicationsSuccess(applications);
      return applications;
    } catch (errors: any) {
      getApplicationsFailure(errors);

      throw errors;
    }
  };

  const ApplicationsStart = () => {
    isLoading.value = true;
  };

  const ApplicationsSuccess = () => {
    isLoading.value = false;
  };

  const ApplicationsFailure = (errors: any) => {
    isLoading.value = false;
    error.value = errors;
  };

  const addApplications = async (applicationData: any): Promise<any> => {
    try {
      ApplicationsStart();
      const response = await applicationsApi.addApplications(applicationData);
      ApplicationsSuccess();
      return response.data;
    } catch (errors: any) {
      getApplicationsFailure(errors);
      throw errors;
    }
  };

  const updateApplications = async (
    id: any,
    selectedItem: any
  ): Promise<any> => {
    try {
      ApplicationsStart();
      await applicationsApi.updateApplications(id, selectedItem);
      ApplicationsSuccess();
    } catch (errors: any) {
      ApplicationsFailure(errors);
      throw errors;
    }
  };

  const deleteApplications = async (id: any): Promise<any> => {
    try {
      ApplicationsStart();
      await applicationsApi.deleteApplications(id);
      ApplicationsSuccess();
    } catch (errors: any) {
      ApplicationsFailure(errors);
      throw errors;
    }
  };

  return {
    data,
    getApplications,
    isLoading,
    error,
    getApplicationsStart,
    getApplicationsSuccess,
    getApplicationsFailure,
    addApplications,
    ApplicationsStart,
    ApplicationsSuccess,
    ApplicationsFailure,
    updateApplications,
    deleteApplications,
  };
}
