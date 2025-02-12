import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/ || https://task-manager-zic5.onrender.com", 
});

// Interceptor para adicionar automaticamente o token às requisições
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
