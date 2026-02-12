import api from "../../../services/api";

const ENDPOINT = "/users";

const userService = {
  getAll: async (params = {}) => {
    const resposne = await api.get(ENDPOINT, { params });
    return resposne;
  },
  getById: async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response;
  },
  create: async (userData) => {
    const response = await api.create(ENDPOINT, userData);
    return response;
  },
  update: async (id, userDat) => {
    const response = await api.put(`${ENDPOINT}/${id}`, userDat);
    return response;
  },
  delete: async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response;
  },
};

export default userService;
