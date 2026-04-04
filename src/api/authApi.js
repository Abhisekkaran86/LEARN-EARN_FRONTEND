
// // import axios from "axios";

// // const API = axios.create({
// //   baseURL: "https://learn-earn-contest-2.onrender.com/api/v1",
// // });

// // export const registerUser = (data) => API.post("/auth/register", data);

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { loginUserApi } from "../api/auth.api";

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await loginUserApi(formData);

//       // 🔥 IMPORTANT: backend must send role
//       // Example:
//       // res.data = { token: "...", role: "admin" }

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

import axios from "axios";

const API = axios.create({
  baseURL: "https://learn-earn-contest-2.onrender.com/api/v1",
});


export const loginUserApi = (data) => API.post("/auth/login", data);


export const logoutUserApi = (token) =>
  API.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );