// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";

// const BASE_URL =
//   "https://learn-earn-contest-3.onrender.com/api/v1/contest";

// // CREATE
// export const createContest = createAsyncThunk(
//   "contest/createContest",
//   async (data, { rejectWithValue }) => {
//     try {
//       const token = Cookies.get("token");
//       const res = await axios.post(`${BASE_URL}/create`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data || { message: err.message }
//       );
//     }
//   }
// );

// // FETCH
// export const fetchContests = createAsyncThunk(
//   "contest/fetchContests",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(BASE_URL);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// // DELETE
// export const deleteContest = createAsyncThunk(
//   "contest/deleteContest",
//   async (id, { rejectWithValue }) => {
//     try {
//       const token = Cookies.get("token");
//       await axios.delete(`${BASE_URL}/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return id;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data || { message: err.message }
//       );
//     }
//   }
// );

// // UPDATE
// export const updateContest = createAsyncThunk(
//   "contest/updateContest",
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const token = Cookies.get("token");
//       const res = await axios.put(`${BASE_URL}/update/${id}`, data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data || { message: err.message }
//       );
//     }
//   }
// );

// // SLICE
// const contestSlice = createSlice({
//   name: "contest",
//   initialState: {
//     contests: [],
//     loading: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       // FETCH
//       .addCase(fetchContests.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchContests.fulfilled, (state, action) => {
//         state.loading = false;
//         state.contests =
//           action.payload?.data ||
//           action.payload?.contests ||
//           action.payload?.data?.contests ||
//           action.payload ||
//           [];
//       })
//       .addCase(fetchContests.rejected, (state) => {
//         state.loading = false;
//       })

//       // CREATE
//       .addCase(createContest.fulfilled, (state, action) => {
//         const newContest = action.payload?.data || action.payload;
//         if (newContest) {
//           state.contests.unshift(newContest);
//         }
//       })

//       // UPDATE
//       .addCase(updateContest.fulfilled, (state, action) => {
//         const updated = action.payload?.data || action.payload;
//         const index = state.contests.findIndex(
//           (c) => c._id === updated._id
//         );
//         if (index !== -1) {
//           state.contests[index] = updated;
//         }
//       })

//       // DELETE
//       .addCase(deleteContest.fulfilled, (state, action) => {
//         state.contests = state.contests.filter(
//           (c) => c._id !== action.payload
//         );
//       });
//   },
// });

// export default contestSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";// ✅ ONLY CHANGE
import Cookies from "js-cookie";


const BASE_URL = "/contest"; // ✅ keep relative (important)

const getContestId = (contest) => contest?._id || contest?.id || null;

const getContestList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.contests)) {
    return payload.contests;
  }

  if (Array.isArray(payload?.data?.contests)) {
    return payload.data.contests;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

const getContestItem = (payload) =>
  payload?.contest || payload?.data?.contest || payload?.data || payload || null;

// CREATE
export const createContest = createAsyncThunk(
  "contest/createContest",
  async (data, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const res = await API.post(`${BASE_URL}/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return getContestItem(res.data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

// FETCH
export const fetchContests = createAsyncThunk(
  "contest/fetchContests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get(BASE_URL); // ✅ FIXED
      return getContestList(res.data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

// DELETE
export const deleteContest = createAsyncThunk(
  "contest/deleteContest",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      await API.delete(`${BASE_URL}/delete/${id}`, { // ✅ FIXED
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

// UPDATE
export const updateContest = createAsyncThunk(
  "contest/updateContest",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const res = await API.put(`${BASE_URL}/update/${id}`, data, { // ✅ FIXED
        headers: { Authorization: `Bearer ${token}` },
      });
      return getContestItem(res.data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

// SLICE (UNCHANGED)
const contestSlice = createSlice({
  name: "contest",
  initialState: {
    contests: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContests.fulfilled, (state, action) => {
        state.loading = false;
        state.contests = action.payload;
      })
      .addCase(fetchContests.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createContest.fulfilled, (state, action) => {
        if (action.payload) {
          state.contests.unshift(action.payload);
        }
      })

      .addCase(updateContest.fulfilled, (state, action) => {
        const updated = action.payload;
        const updatedId = getContestId(updated);

        if (!updatedId) {
          return;
        }

        const index = state.contests.findIndex(
          (contest) => getContestId(contest) === updatedId
        );
        if (index !== -1) {
          state.contests[index] = updated;
        }
      })

      .addCase(deleteContest.fulfilled, (state, action) => {
        state.contests = state.contests.filter(
          (contest) => getContestId(contest) !== action.payload
        );
      });
  },
});

export default contestSlice.reducer;
