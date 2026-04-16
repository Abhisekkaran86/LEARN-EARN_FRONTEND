import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import API from "@/services/axios";
import { logoutUserApi } from "./authAPI";
import {
  clearAuthSession,
  getAuthRole,
  getAuthToken,
  getStoredUser,
  persistAuthSession,
} from "@/utils/authStorage";
import {
  normalizeUserProfileData,
  saveLocalUserProfileMeta,
} from "@/utils/userProfile";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://learn-earn-contest-3.onrender.com/api/v1";
const authProfileEndpoints = ["/auth/user/me", "/auth/user/profile"];
const userPayloadKeys = [
  "_id",
  "id",
  "name",
  "email",
  "role",
  "createdAt",
  "registeredAt",
  "profileImage",
  "profilePicture",
  "avatar",
];

const savedUser = normalizeUserProfileData(getStoredUser());

const hasUserPayload = (value) =>
  value &&
  typeof value === "object" &&
  userPayloadKeys.some((key) => Boolean(value[key]));

const pickUserPayloadSource = (data = {}) =>
  [data?.user, data?.data?.user, data?.data, data].find(hasUserPayload) || null;

const extractUserFromAuthPayload = (data = {}) => {
  const payloadSource = pickUserPayloadSource(data);

  if (!payloadSource) {
    return null;
  }

  return {
    _id: payloadSource._id || payloadSource.id,
    name: payloadSource.name,
    email: payloadSource.email,
    role: payloadSource.role,
    createdAt: payloadSource.createdAt,
    registeredAt: payloadSource.registeredAt,
    profileImage: payloadSource.profileImage,
    profilePicture: payloadSource.profilePicture,
    avatar: payloadSource.avatar,
  };
};

const normalizeAuthPayload = (data = {}) => {
  const extractedUser = extractUserFromAuthPayload(data);

  if (!extractedUser) {
    return data;
  }

  const normalizedUser = normalizeUserProfileData(extractedUser);

  return {
    ...data,
    user: normalizedUser,
    role: data.role || data?.data?.role || normalizedUser?.role,
    accessToken: data.accessToken || data?.data?.accessToken,
  };
};

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const isFormData =
        typeof FormData !== "undefined" && userData instanceof FormData;
      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        userData,
        isFormData
          ? undefined
          : {
              headers: {
                "Content-Type": "application/json",
              },
            }
      );
      return normalizeAuthPayload(res.data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed ❌"
      );
    }
  }
);

// CURRENT USER PROFILE
export const fetchCurrentUserProfile = createAsyncThunk(
  "auth/fetchCurrentUserProfile",
  async (_, { rejectWithValue }) => {
    if (!getAuthToken()) {
      return rejectWithValue("No active session found");
    }

    let lastError = null;

    for (const endpoint of authProfileEndpoints) {
      try {
        const res = await API.get(endpoint);
        const userPayload =
          res?.data?.user ||
          res?.data?.data?.user ||
          res?.data?.data ||
          res?.data;

        return normalizeUserProfileData(userPayload);
      } catch (err) {
        lastError = err;

        if (err.response?.status === 404) {
          continue;
        }

        if (typeof err.response?.status === "number" && err.response.status >= 500) {
          continue;
        }

        if (err.response?.status === 401 || err.response?.status === 403) {
          clearAuthSession();
        }

        break;
      }
    }

    return rejectWithValue(
      lastError?.response?.data?.message || "Unable to load user profile"
    );
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return normalizeAuthPayload(res.data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed ❌"
      );
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();

      if (token) {
        await logoutUserApi(token);
      }

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
    user: savedUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      clearAuthSession();
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

      // CURRENT USER PROFILE
      .addCase(fetchCurrentUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;

        saveLocalUserProfileMeta({
          email: action.payload?.email,
          userId: action.payload?._id,
          profileImage: action.payload?.profileImage,
          registeredAt: action.payload?.createdAt || action.payload?.registeredAt,
        });

        persistAuthSession({
          accessToken: getAuthToken(),
          role: action.payload?.role || getAuthRole(),
          user: action.payload,
        });
      })
      .addCase(fetchCurrentUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        if (!getAuthToken()) {
          state.user = null;
        }
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const data = action.payload;
        const normalizedUser = normalizeUserProfileData(data.user);

        state.user = normalizedUser;

        saveLocalUserProfileMeta({
          email: normalizedUser?.email,
          userId: normalizedUser?._id,
          profileImage: normalizedUser?.profileImage,
          registeredAt: normalizedUser?.createdAt || normalizedUser?.registeredAt,
        });

        persistAuthSession({
          accessToken: data.accessToken,
          role: data.role || normalizedUser?.role,
          user: normalizedUser,
        });
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
        clearAuthSession();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
