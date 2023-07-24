import { createSelector, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      window.location.reload();
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    removeItem: (state, action) => {
      const { productId } = action.payload;
      // Find the index of the item with the specified productId
      const itemIndex = state.currentUser.cart.findIndex(
        (item) => item._id === productId
      );
      if (itemIndex !== -1) {
        // Remove the item from the cart array using splice
        state.currentUser.cart.splice(itemIndex, 1);
      }
    },

    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const updatedProduct = state.currentUser.cart.find(
        (item) => item._id === productId
      );

      if (updatedProduct) {
        // Check if the quantity is already at the minimum (0) and the action is decreasing
        if (updatedProduct.quantity === 1 && quantity === -1) {
          return; // Exit the reducer without making any changes
        }

        updatedProduct.quantity += quantity;

        // Check if the quantity becomes less than zero and the action is decreasing
        if (updatedProduct.quantity < 0 && quantity === -1) {
          updatedProduct.quantity = 0; // Set the quantity to zero to prevent negative values
        }
      }
    },

    addProductToCart: (state, action) => {
      const updatedProduct = action.payload;
      const existingProductIndex = state.currentUser.cart.findIndex(
        (item) => item._id === updatedProduct._id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, increase its quantity
        state.currentUser.cart[existingProductIndex].quantity +=
          updatedProduct.quantity;
      } else {
        // If the product is not in the cart, add it
        state.currentUser.cart.push(updatedProduct);
      }
    },
    updateCart: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        cart: action.payload,
      };
    },
  },
});
export const selectCart = createSelector(
  (state) => state.user.currentUser?.cart,
  (cart) => cart || []
);
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  addProductToCart,
  updateProductQuantity,
  removeItem,
  updateCart, // Added updateCart action
} = userSlice.actions;
export default userSlice.reducer;
