export interface Service {
  id: string;
  name: string;
  url: string;
  description: string;
  login: string;
  password: string;
  tags: string;
  virtual_machine: string;
}

// Интерфейс для виртуальной машины
export interface VirtualMachineName {
  id: string;
  name: string;
}

// Интерфейс для ответа от API с виртуальными машинами
export interface VirtualMachinesApiResponse {
  data: VirtualMachineName[];
}
