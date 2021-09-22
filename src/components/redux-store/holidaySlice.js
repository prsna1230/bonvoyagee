import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAxiosWithTokenObj from "../Authorizationreq/AxiosReqWithToken";

// get holiday
export const getHoliday = createAsyncThunk(
  "getHoliday",
  async (_, thunkApi) => {
    const data = await axios.get("/holiday/getholiday");
    if (data.data.message === "Success") {
      return data.data.payload;
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// add holiday
export const addHoliday = createAsyncThunk(
  "addHoliday",
  async (formData, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.post(
      "/holiday/addholiday",
      formData
    );

    if (data.data.message === "New Holiday Added") {
      return data.data.payload;
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// edit holiday
export const editHoliday = createAsyncThunk(
  "editHoliday",
  async ({ holId, formData, index }, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.put(
      `/holiday/editholiday/${holId}`,
      formData
    );
    if (data.data.message === "Holiday Updated") {
      return thunkApi.fulfillWithValue({ index, payload: data.data.payload });
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// delete Holiday
export const deleteHoliday = createAsyncThunk(
  "deleteHoliday",
  async ({ holId, index }, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.delete(
      `holiday/deleteholiday/${holId}`
    );
    if (data.data.message === "Holiday deleted") {
      return thunkApi.fulfillWithValue({ index });
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

const holidaySlice = createSlice({
  name: "Holidaypackage",
  initialState: {
    holidaypackage: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidLoginMessage: "",
  },
  reducers: {},
  extraReducers: {
    // get holiday
    [getHoliday.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getHoliday.fulfilled]: (state, action) => {
      state.holidaypackage = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [getHoliday.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },

    // add holiday from admindashboard
    [addHoliday.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addHoliday.fulfilled]: (state, action) => {
      // state.hotels.push(action.payload);
      state.holidaypackage.push(action.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [addHoliday.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },

    // Editing holiday
    [editHoliday.pending]: (state, action) => {
      state.isLoading = true;
    },
    [editHoliday.fulfilled]: (state, action) => {
      state.holidaypackage.splice(
        action.payload.index,
        1,
        action.payload.payload
      );
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [editHoliday.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },

    // delete holiday
    [deleteHoliday.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteHoliday.fulfilled]: (state, action) => {
      state.holidaypackage.splice(action.payload.index, 1);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [deleteHoliday.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },
  },
});

export default holidaySlice.reducer;
