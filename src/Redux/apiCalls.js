import { loginFailure, loginStart, loginSuccess } from "./userRedux.js";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "./registerRedux.js";
import { publicRequest, userRequest } from "../requestMethod.js";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));

  } catch (err) {
    dispatch(loginFailure(err.message));
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    await login(dispatch, user); // Await the login function call
  } catch (err) {
    dispatch(registerFailure(err.message));
  }
};

export const addToCart = async (userId, productData) => {
  try {
    const response = await userRequest.post(
      `/carts/${userId}/add`,
      productData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    await userRequest.delete(`/carts/${userId}/remove/${productId}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
