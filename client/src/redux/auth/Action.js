import axios from "axios";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import {endpoints} from "../../api";

// const API ="https://server-ku5a.onrender.com"


export const login = (email, password) => async (dispatch) => {
  const cookies = new Cookies();
  try {
    const response = await axios.post(endpoints.user.login, {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      const { data, token } = response.data;
      console.log(data)
      cookies.set("token", token );
      cookies.set("userId", data._id );
      cookies.set("userAuthenticated", true);
      dispatch({
        type: "SET_USER_DATA",
        payload: { userData: data, token: token },
      });
    } else {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Invalid response data",
      });
    }

    return response;
  } catch (error) {
    // console.error("Error:", error);
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({
      type: "LOGIN_FAILURE",
      payload: errorMessage,
    });
    throw error;
  }
};




export const Logout = () => {
  const cookies = new Cookies();
  cookies.remove("token");
  cookies.remove("userId");
  cookies.set("userAuthenticated", false);
  return { type: "LOGOUT" };
};

