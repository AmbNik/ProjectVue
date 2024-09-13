import axios from "@/api/axios";

// Метод для получения списка сервисов
const getApplications = () => {
  return axios.get(`/applications/`);
};

// Метод для добавления нового сервиса
const addApplications = (applicationData: any) => {
  try {
    const response = axios.post(`/applications/`, applicationData);
    return response;
  } catch (error) {
    console.error("Ошибка при добавлении приложения:", error);
    throw error;
  }
};
// Метод для обновления существующего сервиса
const updateApplications = (id: any, applicationData: any) => {
  return axios.put(`/applications/${id}/`, applicationData);
};

// Метод для удаления сервиса
const deleteApplications = (id: any) => {
  return axios.delete(`/applications/${id}/`);
};

export default {
  getApplications,
  addApplications,
  updateApplications,
  deleteApplications,
};
