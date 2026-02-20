import axios from "axios";

// 1. Crear instancia axios
const api = axios.create({
  baseURL: "https://mp5150a5e85c577d27a3.free.beeceptor.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Interceptor de Request (antes de enviar)
// Se ejecuta antes de cada petición
api.interceptors.request.use(
  (config) => {
    // Obtener token
    const token = localStorage.getItem("token");

    // Si existe agregarlo al header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Continuar con la petición
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. Interceptor de Response (despues de recibir)
// Se ejecuta después de cada respuesta
api.interceptors.response.use(
  (response) => {
    // Si todo ok, retornar solo la data
    return response.data;
  },
  (error) => {
    // Si hay error
    if (error.response?.status === 401) {
      // Token expiro o no valido
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    const message = error.response?.message || "Error en la petición";
    return Promise.reject(new Error(message));
  },
);

// 4. Exportar
export default api;
