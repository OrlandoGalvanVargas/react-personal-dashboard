import axios from "axios";

const api = axios.create({
  baseURL: "https://mp5150a5e85c577d27a3.free.beeceptor.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    const message = error.response?.message || "Error en la petición";
    return Promise.reject(new Error(message));
  },
);

export default api;
