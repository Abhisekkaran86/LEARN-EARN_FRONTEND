    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';
    import Cookies from 'js-cookie';

    // Async Thunk for Registration ---
    export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
        const res = await axios.post(
            "https://learn-earn-contest-2.onrender.com/api/v1/auth/register",
            userData
        );
        return res.data;
        } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Registration failed ❌");
        }
    }
    );

    // --- Async Thunk for Login ---
    export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
        const res = await axios.post(
            "https://learn-earn-contest-2.onrender.com/api/v1/auth/login",
            credentials
        );
        // Set the cookie centrally when login is successful
        Cookies.set("token", res.data.token, { expires: 7 });
        return res.data;
        } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Login failed ❌");
        }
    }
    );

    const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
        state.user = null;
        Cookies.remove("token");
        }
    },
    extraReducers: (builder) => {
        builder
        // Register Cases
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
        // Login Cases
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload; // Store user data
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
    });

    export const { logout } = authSlice.actions;

    export default authSlice.reducer;