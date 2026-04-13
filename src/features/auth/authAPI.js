import axios from "axios";
import API, { API_BASE_URL } from "@/services/axios";

const PUBLIC_AUTH_API = axios.create({
  baseURL: API_BASE_URL,
});

const shouldFallbackToUserRoutes = (error) => {
  const status = error?.response?.status;
  return status === 404 || status === 405;
};

export const loginUserApi = (data) => API.post("/auth/login", data);

export const forgotPasswordApi = async (email) => {
  try {
    return await PUBLIC_AUTH_API.post("/auth/forgot-password", { email });
  } catch (error) {
    if (!shouldFallbackToUserRoutes(error)) {
      throw error;
    }

    return PUBLIC_AUTH_API.post("/user/password/forgot", { email });
  }
};

export const resetPasswordApi = async (
  token,
  password,
  confirmPassword = password
) => {
  try {
    return await PUBLIC_AUTH_API.post(`/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });
  } catch (error) {
    if (!shouldFallbackToUserRoutes(error)) {
      throw error;
    }

    return PUBLIC_AUTH_API.put(`/user/password/reset/${token}`, {
      password,
      confirmPassword,
    });
  }
};

export const logoutUserApi = (token) =>
  API.post(
    "/auth/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
