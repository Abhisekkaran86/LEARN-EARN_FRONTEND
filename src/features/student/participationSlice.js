import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/axios";

// ✅ async fetch
export const fetchMyParticipation = createAsyncThunk(
  "participation/fetchMyParticipation",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/participation/my-history");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const participationSlice = createSlice({
  name: "participation",
  initialState: {
    history: [],
    summary: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyParticipation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyParticipation.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.history || [];
        state.summary = action.payload.summary || {};
      })
      .addCase(fetchMyParticipation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default participationSlice.reducer;