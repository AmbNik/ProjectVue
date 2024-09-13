import { useApplications } from "@/composables/applications/useApplications";
import { useVirtualMachines } from "@/composables/virtualMachines/useVirtualMachines";

export function useApplicationsApi() {
  const {
    data,
    isLoading,
    error,
    getApplications,
    addApplications,
    updateApplications: updateApplicationsUse,
    deleteApplications: deleteApplicationsUse,
  } = useApplications();

  console.log("data", data.value);

  const { data: virtualMachinesData, getVirtualMachines } =
    useVirtualMachines();

  return {
    data,
    virtualMachinesData,
    isLoading,
    error,
    getApplications,
    addApplications,
    updateApplicationsUse,
    deleteApplicationsUse,
    getVirtualMachines,
  };
}
