import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import wishlistSlice from "./slices/wishlistSlice";

const cartStore = configureStore({
  reducer: {
    productSlice: productSlice,
    wishlistSlice: wishlistSlice,
  },
});

export default cartStore;
