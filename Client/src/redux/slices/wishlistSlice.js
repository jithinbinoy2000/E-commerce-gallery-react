import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      let isDuplicate = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (isDuplicate) {
        alert("This item is already in Your WishList");
      } else {
        const product = action.payload;
        state.wishlist.push(product);
        return;
      }
    },
    removeFromWishlist: (state, action) => {
      let isPresent = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (!isPresent) {
        alert(`please add this item to Wishlist`);
      } else {
        const remainingProducts = state.wishlist.filter(
          (item) => item.id !== action.payload.id
        ); //filter except that product
        state.wishlist = remainingProducts;
        return;
      }
    },
  },
});
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
