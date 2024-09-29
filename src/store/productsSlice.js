import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products } from "../backend/db/products";

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const response = await products(productId);
    return response.data.product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
  },
  reducers: {
    addProductToCart: (state, action) => {
      const product = state.allProducts.find(
        (p) => p._id === action.payload._id
      );
      if (product) {
        product.inCart = true;
      }
    },
    addProductToWishlist: (state, action) => {
      const product = state.allProducts.find(
        (p) => p._id === action.payload._id
      );
      if (product) {
        product.inWish = true;
      }
    },
    removeProductFromWishlist: (state, action) => {
      const product = state.allProducts.find((p) => p._id === action.payload);
      if (product) {
        product.inWish = false;
      }
    },
  },
});

export const {
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
} = productsSlice.actions;

export default productsSlice.reducer;
