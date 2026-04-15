import API from "@/services/axios";

export const loginUserApi = (data) => API.post("/auth/login", data);

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
