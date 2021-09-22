import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAxiosWithTokenObj from "../Authorizationreq/AxiosReqWithToken";

// get hotels
export const getHotels = createAsyncThunk("getHotels", async (_, thunkApi) => {
  const data = await axios.get("/hotel/gethotel");
  if (data.data.message === "Success") {
    return data.data.payload;
  } else {
    return thunkApi.rejectWithValue(data.data);
  }
});

// add hotels
export const addHotels = createAsyncThunk(
  "addHotels",
  async (formData, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.post("/hotel/addhotel", formData);
    if (data.data.message === "New Hotel Added") {
      return data.data.payload;
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// edit hotels
export const editHotels = createAsyncThunk(
  "editHotels",
  async ({ hid, formData, index }, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.put(
      `/hotel/edithotel/${hid}`,
      formData
    );
    if (data.data.message === "Hotel updated") {
      return thunkApi.fulfillWithValue({ index, payload: data.data.payload });
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// delete Hotels
export const deleteHotels = createAsyncThunk(
  "deleteHotels",
  async ({ hid, index }, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.delete(
      `/hotel/deletehotel/${hid}`
    );
    console.log("data value", data);
    if (data.data.message === "Hotel deleted") {
      return thunkApi.fulfillWithValue({ index });
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

const hotelSlice = createSlice({
  name: "Hotels",
  initialState: {
    hotels: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidLoginMessage: "",
  },
  reducers: {},
  extraReducers: {
    [getHotels.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getHotels.fulfilled]: (state, action) => {
      // state.hotels.push(action.payload);
      state.hotels = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [getHotels.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },
    // Adding Hotel
    [addHotels.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addHotels.fulfilled]: (state, action) => {
      // state.hotels.push(action.payload);
      state.hotels.push(action.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [addHotels.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },

    // Editing Hotel
    [editHotels.pending]: (state, action) => {
      state.isLoading = true;
    },
    [editHotels.fulfilled]: (state, action) => {
      state.hotels.splice(action.payload.index, 1, action.payload.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [editHotels.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },

    // Delete Hotels
    [deleteHotels.pending]: (state, action) => {
      state.isLoading = true;
    },

    [deleteHotels.fulfilled]: (state, action) => {
      state.hotels.splice(action.payload.index, 1);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [deleteHotels.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },
  },
});

export default hotelSlice.reducer;
