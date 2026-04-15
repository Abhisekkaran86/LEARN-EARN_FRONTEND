
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";// ✅ ONLY CHANGE
import Cookies from "js-cookie";
import { CONTEST_BRIEF_UPLOAD_FIELD_CANDIDATES } from "@/utils/contestBriefing";

const BASE_URL = "/contest"; // ✅ keep relative (important)

const extractContestFromPayload = (payload) =>
  payload?.contest ||
  payload?.data?.contest ||
  payload?.data ||
  payload ||
  null;

const extractContestListFromPayload = (payload) =>
  payload?.contests ||
  payload?.data?.contests ||
  payload?.data ||
  payload ||
  [];

const hasBriefingField = (data) =>
  CONTEST_BRIEF_UPLOAD_FIELD_CANDIDATES.some((field) => data.has(field));

const cloneFormDataWithBriefingField = (data, nextFieldName) => {
  const nextFormData = new FormData();

  for (const [key, value] of data.entries()) {
    nextFormData.append(
      CONTEST_BRIEF_UPLOAD_FIELD_CANDIDATES.includes(key) ? nextFieldName : key,
      value
    );
  }

  return nextFormData;
};

const getContestRequestConfig = (token, isFormData) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
  },
});

const shouldRetryUnexpectedField = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "";

  return /unexpected field/i.test(String(message));
};

const sendContestMutationRequest = async ({
  method,
  url,
  data,
  token,
}) => {
  const isFormData =
    typeof FormData !== "undefined" && data instanceof FormData;

  if (!isFormData || !hasBriefingField(data)) {
    return API[method](url, data, getContestRequestConfig(token, isFormData));
  }

  const startingFieldName =
    CONTEST_BRIEF_UPLOAD_FIELD_CANDIDATES.find((field) => data.has(field)) ||
    CONTEST_BRIEF_UPLOAD_FIELD_CANDIDATES[0];
  const fieldNamesToTry = [
    startingFieldName,
    ...CONTEST_BRIEF_UPLOAD_FIELD_CANDIDATES.filter(
      (field) => field !== startingFieldName
    ),
  ];
  let lastError = null;

  for (const fieldName of fieldNamesToTry) {
    try {
      const nextPayload = cloneFormDataWithBriefingField(data, fieldName);

      return await API[method](
        url,
        nextPayload,
        getContestRequestConfig(token, true)
      );
    } catch (error) {
      lastError = error;

      if (!shouldRetryUnexpectedField(error)) {
        throw error;
      }
    }
  }

  throw lastError;
};

// CREATE
export const createContest = createAsyncThunk(
  "contest/createContest",
  async (data, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const res = await sendContestMutationRequest({
        method: "post",
        url: `${BASE_URL}/create`,
        data,
        token,
      });
      return res.data;
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
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
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
      const res = await sendContestMutationRequest({
        method: "put",
        url: `${BASE_URL}/update/${id}`,
        data,
        token,
      });
      return res.data;
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
        state.contests = extractContestListFromPayload(action.payload);
      })
      .addCase(fetchContests.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createContest.fulfilled, (state, action) => {
        const newContest = extractContestFromPayload(action.payload);
        if (newContest) {
          state.contests.unshift(newContest);
        }
      })

      .addCase(updateContest.fulfilled, (state, action) => {
        const updated = extractContestFromPayload(action.payload);
        if (!updated?._id) {
          return;
        }

        const index = state.contests.findIndex(
          (c) => c._id === updated._id
        );
        if (index !== -1) {
          state.contests[index] = updated;
        }
      })

      .addCase(deleteContest.fulfilled, (state, action) => {
        state.contests = state.contests.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export default contestSlice.reducer;


