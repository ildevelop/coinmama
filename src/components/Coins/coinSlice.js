import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "./coinAPI";

const initialState = {
  value: 0,
  coins: {},
  loading: false,
  history: [],
};

export const getCoins = createAsyncThunk("get/coins", async () => {
  const response = await Api.getCoins();
  const BTCcoin = response.data.find((c) => c.coin === "btc");
  const ETHcoin = response.data.find((c) => c.coin === "eth");
  const LTCcoin = response.data.find((c) => c.coin === "ltc");
  return { BTC: BTCcoin, ETH: ETHcoin, LTC: LTCcoin };
});
export const getHistory = createAsyncThunk("get/history", async () => {
  const response = await Api.getHistory();
  return response.data;
});

export const coinSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      });
    builder
      .addCase(getHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      });
  },
});

export const { decrement } = coinSlice.actions;

export const selectCions = (state) => state.main.coins;
export const selectHistory = (state) => state.main.history;

export default coinSlice.reducer;
