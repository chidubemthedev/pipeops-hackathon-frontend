import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSimplifiedError } from "../../util";
import { APIService } from "../../util/APIService";
import { url } from "../../util/endpoints";

export interface OrderState {
  loading: boolean;
}

const initialState: OrderState = {
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(generateOrder.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const generateOrder = createAsyncThunk(
  "generateOrder",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.generateOrder}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const orderSelector = (state: any) => state.order;

export const { clearState } = orderSlice.actions;

export default orderSlice.reducer;
