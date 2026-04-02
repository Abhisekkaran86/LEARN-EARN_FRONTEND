// // src/redux/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (form, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         "https://learn-earn-contest-2.onrender.com/api/v1/auth/register",
//         form
//       );
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     loading: false,
//     success: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default authSlice.reducer;