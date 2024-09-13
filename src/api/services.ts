import axios from "@/api/axios";

import type { Service } from "@/types/interfaces/services";

const getServices = () => {
  return axios.get(`/services/`);
};

const addService = async (serviceData: Service) => {
  try {
    const response = await axios.post(`/services/`, serviceData);
    // Предполагаем, что ID нового сервиса возвращается в response.data.id
    return response;
  } catch (error) {
    console.error("Ошибка при добавлении сервиса:", error);
    throw error;
  }
};

// Метод для обновления существующего сервиса
const updateService = (id: number, serviceData: Service) => {
  console.log("serviceData", serviceData);
  return axios.put(`/services/${id}/`, serviceData);
};

// Метод для удаления сервиса
const deleteService = (id: number) => {
  return axios.delete(`/services/${id}/`);
};

export default { getServices, addService, updateService, deleteService };
