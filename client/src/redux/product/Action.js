import axios from "axios";

const api = "http://localhost:4000/products";

export const allProduct = (queryParams) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "PRODUCTS_LOADING" });
      const res = await axios.get(api, { params: queryParams });
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({ type: "PRODUCTS_ERROR", payload: error.message });
    }
  };
};
