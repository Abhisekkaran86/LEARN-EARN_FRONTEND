import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// CREATE CONTEST API
export const createContest = createAsyncThunk(
    "contest/createContest",
    async (contestData, thunkAPI) => {
        try {

            const res = await axios.post(
                "https://learn-earn-contest-2.onrender.com/api/v1/contest/create",
                contestData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            return res.data;

        } catch (error) {

            console.log("API ERROR:", error.response?.data);

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );

        }
    }
);

const contestSlice = createSlice({
    name: "contest",

    initialState: {
        loading: false,
        success: false,
        contest: null,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(createContest.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(createContest.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.contest = action.payload;
            })

            .addCase(createContest.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });

    },
});

export default contestSlice.reducer;