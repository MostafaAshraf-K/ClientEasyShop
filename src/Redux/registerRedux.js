import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    isFetching: false,
    error: false,
    registeredUser: null, // Add a new field to store the registered user data
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.registeredUser = action.payload; // Store the registered user data
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } =
  registerSlice.actions;
export default registerSlice.reducer;
