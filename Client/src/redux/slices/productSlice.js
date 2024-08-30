import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  name:'productSlice',
  products: [],
  productContainer: [],
  loading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "productSlice/fetchProducts",
  async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    productCategory: (state, action) => {
      switch (true) {
        case action.payload == "all": {
          state.products = state.productContainer;
          break;
        }
        case action.payload == "beauty": {
          state.products = state.productContainer.filter(
            (product) => product.category === "beauty"
          );
          break;
        }
        case action.payload == "groceries": {
          state.products = state.productContainer.filter(
            (product) => product.category === "groceries"
          );
          break;
        }
        case action.payload == "furniture": {
          state.products = state.productContainer.filter(
            (product) => product.category === "furniture"
          );
          break;
        }
        case action.payload == "fragrances": {
          state.products = state.productContainer.filter(
            (product) => product.category === "fragrances"
          );
          break;
        }
        default: {
          state.products = state.productContainer;
          break;
        }
      }
    },
    productSort: (state, action) => {
      switch (true) {
        case action.payload === "defult": {
          state.products = state.productContainer;
          break;
        }
        case action.payload === "priceLowToHigh": {
          state.products = state.products
            ? state.products.sort((a, b) => a.price - b.price)
            : state.productContainer.sort((a, b) => a.price - b.price);
          break;
        }
        case action.payload === "priceHighToLow": {
          state.products = state.products
            ? state.products.sort((a, b) => b.price - a.price)
            : state.productContainer.sort((a, b) => b.price - a.price);
          break;
        }
        case action.payload === "rateHightoLow": {
          state.products = state.products
            ? state.products.sort((a, b) => b.rating - a.rating)
            : state.productContainer.sort((a, b) => b.rating - a.rating);
          break;
        }
        case action.payload === "rateLowToHigh": {
          state.products = state.products
            ? state.products.sort((a, b) => a.rating - b.rating)
            : state.productContainer.sort((a, b) => a.rating - b.rating);
          break;
        }
        default: {
          state.products = state.productContainer;
        }
      }
    },
    productSearch: (state, action) => {
      state.products = state.productContainer.filter((item) =>
        item.title.toLowerCase().includes(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productContainer = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
export const { productCategory, productSort, productSearch } =
  productSlice.actions;
export default productSlice.reducer;
