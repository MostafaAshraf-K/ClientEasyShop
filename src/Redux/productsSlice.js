// productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category, { rejectWithValue }) => {
    try {
      const url = category
        ? `${import.meta.env.VITE_BACKEND}products?category=${category}`
        : `${import.meta.env.VITE_BACKEND}products`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the products slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export default productsSlice.reducer;
export const productsActions = {
  ...productsSlice.actions,
  fetchProducts,
};
