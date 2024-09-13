import { ref } from "vue";
import servicesApi from "@/api/services";
import type { Service } from "@/types/interfaces/services";
import { AxiosError } from "axios";

export function useServices() {
  const isLoading = ref<boolean>(false);
  const data = ref<Service[] | null>(null);
  const error = ref<AxiosError | null>(null);

  const getServicesStart = () => {
    isLoading.value = true;
    data.value = null;
  };

  const getServicesSuccess = (items: Service[]) => {
    isLoading.value = false;
    data.value = items;
  };

  const getServicesFailure = (errors: AxiosError) => {
    isLoading.value = false;
    error.value = errors;
  };

  const getServices = async (): Promise<Service[]> => {
    console.log("sdsd");
    try {
      getServicesStart();
      const response = await servicesApi.getServices();
      const services = response.data; // Извлекаем данные из ответа
      getServicesSuccess(services);
      return services;
    } catch (errors: any) {
      getServicesFailure(errors);

      throw errors;
    }
  };

  const ServicesStart = () => {
    isLoading.value = true;
  };

  const ServicesSuccess = () => {
    isLoading.value = false;
  };

  const ServicesFailure = (errors: AxiosError) => {
    isLoading.value = false;
    error.value = errors;
  };

  const addServices = async (serviceData: Service): Promise<Service> => {
    try {
      ServicesStart();
      const response = await servicesApi.addService(serviceData);
      ServicesSuccess();
      console.log("response.data.id;", response);
      return response.data;
    } catch (errors: any) {
      getServicesFailure(errors);
      throw errors;
    }
  };

  const updateService = async (
    id: number,
    selectedItem: Service
  ): Promise<void> => {
    try {
      ServicesStart();
      await servicesApi.updateService(id, selectedItem);
      ServicesSuccess();
    } catch (errors: any) {
      ServicesFailure(errors);
      throw errors;
    }
  };

  const deleteService = async (id: number): Promise<void> => {
    try {
      ServicesStart();
      await servicesApi.deleteService(id);
      ServicesSuccess();
    } catch (errors: any) {
      ServicesFailure(errors);
      throw errors;
    }
  };

  return {
    data,
    getServices,
    isLoading,
    error,
    getServicesStart,
    getServicesSuccess,
    getServicesFailure,
    addServices,
    ServicesStart,
    ServicesSuccess,
    ServicesFailure,
    updateService,
    deleteService,
  };
}
