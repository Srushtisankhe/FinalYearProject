import axios from "axios";
import {API_BASE_URL, endpoints} from "../../api";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const createAuthorizedApi = () => {
  const userCookie = cookies.get("token");
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${userCookie}`,
    },
  });
};

export const addToCart = (cartData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ADD_TO_CART_REQUEST" });
      const res = await createAuthorizedApi().post(endpoints.cart.addToCart, cartData);
      dispatch({ type: "ADD_TO_CART_SUCCESS", payload: res.data.data });

      // const existingData = JSON.parse(localStorage.getItem("cartData")) || {};
      // console.log(existingData)
      // localStorage.setItem("lscart",JSON.stringify({"data":[...existingData,res.data.data._id]}));

      // console.log(res.data.data)
    } catch (error) {
      dispatch({ type: "ADD_TO_CART_FAILURE", payload: error.message });
    }
  };
};

export const getCart = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_CART_REQUEST" });
      const res = await createAuthorizedApi().get(`${endpoints.cart.getCart}/${userId}`);
      dispatch({ type: "GET_CART_SUCCESS", payload: res.data });
       localStorage.setItem("data",JSON.stringify(res.data));
    } catch (error) {
      dispatch({ type: "GET_CART_FAILURE", payload: error.message });
    }
  };
};

export const updateCart = (cartItemId, quantity) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_CART_REQUEST" });
      const res = await createAuthorizedApi().put(`${endpoints.cart.updateCart}/${cartItemId}`, { quantity });
      dispatch({ type: "UPDATE_CART_SUCCESS", payload: res.data.data });
    } catch (error) {
      dispatch({ type: "UPDATE_CART_FAILURE", payload: error.message });
    }
  };
};

export const removeCart = (cartItemId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "REMOVE_CART_REQUEST" });
      await createAuthorizedApi().delete(`${endpoints.cart.removeCart}/${cartItemId}`);
      dispatch({ type: "REMOVE_CART_SUCCESS", payload: cartItemId });
    } catch (error) {
      dispatch({ type: "REMOVE_CART_FAILURE", payload: error.message });
    }
  };
};
