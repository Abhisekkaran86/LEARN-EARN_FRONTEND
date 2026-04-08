


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { logoutUserApi } from "../api/authApi"; // ✅ moved here

const BASE_URL = "https://learn-earn-contest-2.onrender.com/api/v1";

// ✅ REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed ❌"
      );
    }
  }
);

// ✅ LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, credentials);

      Cookies.set("token", res.data.accessToken, { expires: 7 });
      Cookies.set("role", res.data.role, { expires: 7 });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed ❌"
      );
    }
  }
);

// ✅ LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      await logoutUserApi(token);
      return true;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Logout failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      Cookies.remove("token");
      Cookies.remove("role");
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = {
          ...action.payload.user,
          role: action.payload.role,
        };

        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        Cookies.remove("token");
        Cookies.remove("role");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { logoutUserApi } from "../api/authApi";

// const BASE_URL = "https://learn-earn-contest-2.onrender.com/api/v1";

// // ✅ REGISTER
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${BASE_URL}/auth/register`, userData);

//       const token = res.data.accessToken;

//       // 🔥 STORE TOKEN
//       Cookies.set("token", token, { expires: 7 });
//       localStorage.setItem("token", token);

//       return {
//         user: res.data.user,
//         role: res.data.role,
//         token,
//       };
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Registration failed ❌"
//       );
//     }
//   }
// );

// // ✅ LOGIN
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${BASE_URL}/auth/login`, credentials);

//       const token = res.data.accessToken;

//       Cookies.set("token", token, { expires: 7 });
//       localStorage.setItem("token", token);

//       return {
//         user: res.data.user,
//         role: res.data.role,
//         token,
//       };
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Login failed ❌"
//       );
//     }
//   }
// );

// // ✅ LOGOUT
// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token =
//         localStorage.getItem("token") || Cookies.get("token");

//       await logoutUserApi(token);
//       return true;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Logout failed"
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token:
//       localStorage.getItem("token") || Cookies.get("token") || null,
//     loading: false,
//     error: null,
//   },

//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;

//       localStorage.removeItem("token");
//       Cookies.remove("token");
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // 🔥 REGISTER
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;

//         state.user = action.payload.user;
//         state.token = action.payload.token;

//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // 🔥 LOGIN
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;

//         state.user = action.payload.user;
//         state.token = action.payload.token;

//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // 🔥 LOGOUT
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;

//         localStorage.removeItem("token");
//         Cookies.remove("token");
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;