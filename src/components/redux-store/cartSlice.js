import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAxiosWithTokenObj from "../Authorizationreq/AxiosReqWithToken";

// get cartdetails
export const getCart = createAsyncThunk("getCart", async (_, thunkApi) => {
  const data = await axios.get("/cart/getcart");
  if (data.data.message === "Success") {
    return data.data.payload;
  } else {
    return thunkApi.rejectWithValue(data.data);
  }
});

// adding to cart
export const addCart = createAsyncThunk(
  "addCart",
  async (formData, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.post("/cart/addcart", formData);
    console.log(data);
    if (data.data.message === "New Item Added") {
      return data.data.payload;
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// deleting from cart
export const deleteCart = createAsyncThunk(
  "deleteCart",
  async ({ id, index }, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.delete(`/cart/deletecart/${id}`);
    console.log("data value", data);
    if (data.data.message === "Deleted") {
      return thunkApi.fulfillWithValue({ index });
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidMessage: "",
  },
  reducers: {},
  // Adding cart
  extraReducers: {
    [getCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      // state.hotels.push(action.payload);
      state.cart = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [addCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addCart.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidMessage = action.payload.message;
    },
    [addCart.fulfilled]: (state, action) => {
      let arr = JSON.parse(JSON.stringify(action.payload));
      state.cart.push(arr);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [addCart.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidMessage = action.payload.message;
    },
    //  delete cart
    [deleteCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteCart.fulfilled]: (state, action) => {
      state.cart.splice(action.payload.index, 1);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [deleteCart.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidMessage = action.payload.message;
    },
  },
});

export default cartSlice.reducer;
