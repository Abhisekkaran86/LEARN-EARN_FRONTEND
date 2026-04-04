import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/contest";

// ✅ CREATE
export const createContestApi = (data) => {
  return axios.post(`${BASE_URL}/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ GET
export const fetchContestApi = () => {
  return axios.get(BASE_URL);
};

// ✅ UPDATE
export const updateContestApi = (id, data) => {
  return axios.put(`${BASE_URL}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ DELETE
export const deleteContestApi = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};