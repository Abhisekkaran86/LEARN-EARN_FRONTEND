import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "https://learn-earn-contest-3.onrender.com/api/v1",
});

// Token injection
API.interceptors.request.use((config) => {
  const token = Cookies.get("token");
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

