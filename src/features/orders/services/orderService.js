import api from "../../../services/api";

const ENDPOINT = "/orders";

const orderService = {
  getAll: async (params = {}) => {
    const response = await api.get(ENDPOINT, { params });
    return response;
  },
  getById: async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response;
  },
  create: async (orderData) => {
    const response = await api.post(ENDPOINT, orderData);
    return response;
  },
  update: async (id, orderData) => {
    const response = await api.put(`${ENDPOINT}/${id}`, orderData);
    return response;
  },
  delete: async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response;
  },
  updateStatus: async (id, status) => {
    const response = await api.patch(`${ENDPOINT}/${id}/status`, { status });
    return response;
  },
};

export default orderService;
