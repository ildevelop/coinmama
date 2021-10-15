import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "./coinAPI";

const initialState = {
  value: 0,
  coins: {},
  loading: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(getCoins(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getCoins = createAsyncThunk("get/coins", async () => {
  const response = await Api.getCoins();
  return response.data;
});

export const coinSlice = createSlice({
  name: "main",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
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
  },
});

export const { decrement } = coinSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCions = (state) => state.main.coins;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default coinSlice.reducer;