import { ref } from "vue";
import virtualMachinesApi from "@/api/virtualmachines";

export function useVirtualMachines() {
  const isLoading = ref<boolean>(false);
  const data = ref<any | null>(null);
  const error = ref<null>(null);

  const getVirtualMachinesStart = () => {
    isLoading.value = true;
    data.value = null;
  };

  const getVirtualMachinesSuccess = (items: any) => {
    isLoading.value = false;
    data.value = items;
  };
  const getVirtualMachinesFailure = (errors: any) => {
    isLoading.value = false;
    error.value = errors;
  };

  const getVirtualMachines = async (): Promise<any> => {
    try {
      getVirtualMachinesStart();
      const services = await virtualMachinesApi.getVirtualMachines();
      getVirtualMachinesSuccess(services);
      return services;
    } catch (errors: any) {
      getVirtualMachinesFailure(errors);
      throw errors;
    }
  };

  const VirtualMachinesStart = () => {
    isLoading.value = true;
  };

  const VirtualMachinesSuccess = () => {
    isLoading.value = false;
  };
  const VirtualMachinesFailure = (errors: any) => {
    isLoading.value = false;
    error.value = errors;
  };

  const addVirtualMachines = async (VirtualMachinesData: any): Promise<any> => {
    try {
      VirtualMachinesStart();
      const response = await virtualMachinesApi.addVirtualMachines(
        VirtualMachinesData
      );
      VirtualMachinesSuccess();
      return response.data;
    } catch (errors: any) {
      VirtualMachinesFailure(errors);
      throw errors;
    }
  };

  const updateVirtualMachines = async (
    id: any,
    VirtualMachinesData: any
  ): Promise<any> => {
    try {
      VirtualMachinesStart();
      await virtualMachinesApi.updateVirtualMachines(id, VirtualMachinesData);
      VirtualMachinesSuccess();
    } catch (errors: any) {
      VirtualMachinesFailure(errors);
      throw errors;
    }
  };

  const deleteVirtualMachines = async (id: any): Promise<any> => {
    try {
      VirtualMachinesStart();
      await virtualMachinesApi.deleteVirtualMachines(id);
      VirtualMachinesSuccess();
    } catch (errors: any) {
      VirtualMachinesFailure(errors);
      throw errors;
    }
  };

  return {
    data,
    getVirtualMachines,
    isLoading,
    error,
    getVirtualMachinesStart,
    getVirtualMachinesSuccess,
    getVirtualMachinesFailure,
    addVirtualMachines,
    VirtualMachinesStart,
    VirtualMachinesSuccess,
    VirtualMachinesFailure,
    updateVirtualMachines,
    deleteVirtualMachines,
  };
}
