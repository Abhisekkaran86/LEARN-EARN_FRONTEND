import axios from "axios";
import { getAuthToken } from "@/utils/authStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://learn-earn-contest-3.onrender.com/api/v1";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Token injection
API.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Global loader wiring ---
let loaderRef = { show: null, hide: null };

export const connectLoader = (showLoader, hideLoader) => {
  loaderRef.show = showLoader;
  loaderRef.hide = hideLoader;
};

API.interceptors.request.use(
  (config) => {
    if (loaderRef.show) loaderRef.show();
    return config;
  },
  (error) => {
    if (loaderRef.hide) loaderRef.hide();
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    if (loaderRef.hide) loaderRef.hide();
    return response;
  },
  (error) => {
    if (loaderRef.hide) loaderRef.hide();
    return Promise.reject(error);
  }
);

export default API;
