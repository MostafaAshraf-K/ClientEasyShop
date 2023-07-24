// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     total: 0,
//   },
//   reducers: {
//     addProduct: (state, action) => {
//       const productToAdd = action.payload;
//       const existingProduct = state.products.find(
//         (item) => item._id === productToAdd._id
//       );

//       if (existingProduct) {
//         // If the product already exists in the cart, increase its quantity by 1
//         existingProduct.quantity += 1;
//         state.total += productToAdd.price;
//       } else {
//         // If the product is not in the cart, add it with a quantity of 1
//         state.products.push({ ...productToAdd, quantity: 1 });
//         state.total += productToAdd.price;
//       }
//     },
//     increaseQuantity: (state, action) => {
//       const { productId } = action.payload;
//       const product = state.products.find((item) => item._id === productId);

//       if (product) {
//         // Increase the quantity of the specified product by 1
//         product.quantity += 1;
//         state.total += product.price;
//       }
//     },
//     decreaseQuantity: (state, action) => {
//       const { productId } = action.payload;
//       const product = state.products.find((item) => item._id === productId);

//       if (product && product.quantity > 1) {
//         // Decrease the quantity of the specified product by 1
//         product.quantity -= 1;
//         state.total -= product.price;
//       }
//     },
//     removeItem: (state, action) => {
//       const { productId } = action.payload;
//       const index = state.products.findIndex((item) => item._id === productId);

//       if (index !== -1) {
//         const removedItem = state.products.splice(index, 1)[0];
//         state.total -= removedItem.price * removedItem.quantity;
//       }
//     },
//   },
// });

// export const { addProduct, increaseQuantity, decreaseQuantity, removeItem } =
//   cartSlice.actions;
// export default cartSlice.reducer;
