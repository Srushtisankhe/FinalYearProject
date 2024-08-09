
const initialState = {
  userData: null, 
  token: null,
  loginError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload.userData,
        token: action.payload.token,
        loginError: null,
      };    
    case "LOGIN_FAILURE":
      return {
        ...state,
        loginError: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        userData: null,
        token: null,  
        loginError: null,
      };
    default:
      return state;
  }
};

export default authReducer;

