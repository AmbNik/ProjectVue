import axios from "axios";

// Используйте import.meta.env для доступа к переменным окружения
const baseURL = import.meta.env.VITE_APP_URL_API;

axios.defaults.baseURL = baseURL;

export default axios;
