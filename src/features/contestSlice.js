// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// export const createContest = createAsyncThunk(
//   "contest/createContest",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         "https://learn-earn-contest-2.onrender.com/api/v1/contest/create",
//         data
//       );
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );
// extraReducers: (builder) => {
//   builder
//     .addCase(fetchContests.pending, (state) => {
//       state.loading = true;
//     })
//     .addCase(fetchContests.fulfilled, (state, action) => {
//       state.loading = false;
//       state.contests = action.payload?.data || [];
//     })

//     // 🔥 CREATE
//     .addCase(createContest.fulfilled, (state, action) => {
//       state.contests.unshift(action.payload.data);
//     });
// }

// export const fetchContests = createAsyncThunk(
//   "contest/fetchContests",
//   async () => {
//     const res = await axios.get(
//       "https://learn-earn-contest-2.onrender.com/api/v1/contest"
//     );

//     return res.data;
//   }
// );

// const contestSlice = createSlice({
//   name: "contest",
//   initialState: {
//     contests: [],
//     loading: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContests.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchContests.fulfilled, (state, action) => {
//         state.loading = false;

//         // 🔥 DEBUG (remove later)
//         console.log("🔥 FULL API RESPONSE:", action.payload);

//         // ✅ FINAL FIX (handles all API formats)
//         state.contests =
//           action.payload?.data ||
//           action.payload?.contests ||
//           action.payload?.data?.contests ||
//           [];
//       })
//       .addCase(fetchContests.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export default contestSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://learn-earn-contest-2.onrender.com/api/v1/contest";


// ✅ CREATE
export const createContest = createAsyncThunk(
  "contest/createContest",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log("AXIOS ERROR:", err);

      return rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);


// ✅ FETCH
export const fetchContests = createAsyncThunk(
  "contest/fetchContests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);


// ✅ UPDATE
export const deleteContest = createAsyncThunk(
  "contest/deleteContest",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`); // ✅ correct
      return id;
    } catch (err) {
      console.log("DELETE ERROR:", err);

      return rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

// ✅ DELETE
export const updateContest = createAsyncThunk(
  "contest/updateContest",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/update/${id}`, // ✅ match backend
        data
      );

      return res.data;
    } catch (err) {
      console.log("UPDATE ERROR:", err);

      return rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);


// ✅ SLICE
const contestSlice = createSlice({
  name: "contest",
  initialState: {
    contests: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder

      // 🔥 FETCH
      .addCase(fetchContests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContests.fulfilled, (state, action) => {
        state.loading = false;

        state.contests =
          action.payload?.data ||
          action.payload?.contests ||
          action.payload?.data?.contests ||
          [];
      })
      .addCase(fetchContests.rejected, (state) => {
        state.loading = false;
      })


      // 🔥 CREATE
      .addCase(createContest.fulfilled, (state, action) => {
        state.contests.unshift(action.payload.data);
      })
      .addCase(createContest.rejected, (state, action) => {
        console.log("❌ CREATE ERROR:", action.payload);
      })


      // 🔥 UPDATE
      .addCase(updateContest.fulfilled, (state, action) => {
        const index = state.contests.findIndex(
          (c) => c._id === action.payload.data._id
        );

        if (index !== -1) {
          state.contests[index] = action.payload.data;
        }
      })
      .addCase(updateContest.rejected, (state, action) => {
        console.log("❌ UPDATE ERROR:", action.payload);
      })


      // 🔥 DELETE
      .addCase(deleteContest.fulfilled, (state, action) => {
        state.contests = state.contests.filter(
          (c) => c._id !== action.payload
        );
      })
      .addCase(deleteContest.rejected, (state, action) => {
        console.log("❌ DELETE ERROR:", action.payload);
      });
  },
});

export default contestSlice.reducer;