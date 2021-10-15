import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../components/Coins/coinSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
