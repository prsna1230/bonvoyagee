import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAxiosWithTokenObj from "../Authorizationreq/AxiosReqWithToken";
//get flights
export const getFlights = createAsyncThunk(
  "getFlights",
  async (_, thunkApi) => {
    const data = await axios.get("/flight/getflight");
    if (data.data.message === "Success") {
      return data.data.payload;
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// add flights
export const addFlights = createAsyncThunk(
  "addFlights",
  async (formData, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.post(
      "/flight/addflight",
      formData
    );
    console.log("flight");
    if (data.data.message === "New flight created") {
      return data.data.payload;
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// edit flights
export const editFlights = createAsyncThunk(
  "editFlights",
  async ({ fid, formData, index }, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.put(
      `/flight/editflight/${fid}`,
      formData
    );
    if (data.data.message === "Flight updated") {
      return thunkApi.fulfillWithValue({ index, payload: data.data.payload });
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// delete flights
export const deleteFlights = createAsyncThunk(
  "deleteFlights",
  async ({ fid, index }, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.delete(
      `/flight/deleteflight/${fid}`
    );
    console.log("data value", data);
    if (data.data.message === "Flight deleted") {
      return thunkApi.fulfillWithValue({ index });
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

const flightSlice = createSlice({
  name: "Flights",
  initialState: {
    flights: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidLoginMessage: "",
  },
  reducers: {},
  extraReducers: {
    [getFlights.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getFlights.fulfilled]: (state, action) => {
      state.flights = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [getFlights.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },
    // Adding Flight
    [addFlights.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addFlights.fulfilled]: (state, action) => {
      state.flights.push(action.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [addFlights.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },

    // Editing Flight
    [editFlights.pending]: (state, action) => {
      state.isLoading = true;
    },
    [editFlights.fulfilled]: (state, action) => {
      state.flights.splice(action.payload.index, 1, action.payload.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [editFlights.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },

    // Delete Flights
    [deleteFlights.pending]: (state, action) => {
      state.isLoading = true;
    },

    [deleteFlights.fulfilled]: (state, action) => {
      state.flights.splice(action.payload.index, 1);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [deleteFlights.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },
  },
});

export default flightSlice.reducer;
