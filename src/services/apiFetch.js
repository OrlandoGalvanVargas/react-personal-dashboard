const BASE_URL = "https://api.backend.com";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error en la petición");
  }

  return response.json();
}

export const api = {
  get: (endopint) => apiRequest(endopint, { method: "GET" }),
  post: (endpoint, data) =>
    apiRequest(endpoint, { method: "POST", body: JSON.stringify(data) }),
  put: (endpoint, data) =>
    apiRequest(endpoint, { method: "PUT", body: JSON.stringify(data) }),
  delete: (endopint) => apiRequest(endopint, { method: "DELETE" }),
};
