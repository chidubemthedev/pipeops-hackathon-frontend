import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSimplifiedError } from "../../util";
import { APIService } from "../../util/APIService";
import { url } from "../../util/endpoints";

export interface OrderState {
  loading: boolean;
  responseUrl?: string;
}

const initialState: OrderState = {
  loading: false,
  responseUrl: "",
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
      .addCase(generateOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.responseUrl = payload.data.generatedurl;
      })
      .addCase(generateOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(checkPaymenCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkPaymenCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkPaymenCode.rejected, (state) => {
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

export const checkPaymenCode = createAsyncThunk(
  "checkPaymenCode",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(
        `${url.checkPaymentCode}`,
        payload
      );
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
