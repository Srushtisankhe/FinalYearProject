import axios from "axios";
import {endpoints} from "../../api";

export const GET_CATEGORY= "GET_CATEGORY";


export const allCategory = () => {
  return async (dispatch) => {
    const res = await axios.get(endpoints.category.getAllCategories);
    dispatch({
      type:GET_CATEGORY,
      payload: res.data,
    });
  };
};