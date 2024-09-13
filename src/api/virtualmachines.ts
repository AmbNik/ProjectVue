import axios from "@/api/axios";

const getVirtualMachines = () => {
  return axios.get(`/virtualmachines/`);
};

const addVirtualMachines = (virtualMachinesData: any) => {
  try {
    const response = axios.post(`/virtualmachines/`, virtualMachinesData);
    // Предполагаем, что ID нового сервиса возвращается в response.data.id
    return response;
  } catch (error) {
    console.error("Ошибка при добавлении ВМ:", error);
    throw error;
  }
};
const updateVirtualMachines = (id: any, virtualMachinesData: any) => {
  return axios.put(`/virtualmachines/${id}/`, virtualMachinesData);
};

// const updateVirtualMachines = (id: any, virtualMachinesData: any) => {
//   // Преобразуем virtualMachinesData в объект с ключом virtual_machine
//   const dataToSend = { virtual_machine: virtualMachinesData.virtual_machine };

//   // Отправляем запрос с преобразованными данными
//   return axios.put(`/virtualmachines/${id}/`, dataToSend);
// };

const deleteVirtualMachines = (id: any) => {
  return axios.delete(`/virtualmachines/${id}/`);
};

export default {
  getVirtualMachines,
  addVirtualMachines,
  updateVirtualMachines,
  deleteVirtualMachines,
};
