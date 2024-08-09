const initialState = {
    cartItems: [],
    isLoading: true,
    errorMessage: null,
    totalCartValue:0.00,
    totalDisAmount:0.00,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART_REQUEST":
      case "GET_CART_REQUEST":
      case "UPDATE_CART_REQUEST":
      case "REMOVE_CART_REQUEST":
        return {
          ...state,
          isLoading: true,
          errorMessage: null
        };
  
      case "ADD_TO_CART_SUCCESS":
        return {
          ...state,
          isLoading: false,
          cartItems: [...state.cartItems, action.payload],
          errorMessage: null
        };
  
      case "GET_CART_SUCCESS":
        return {
          ...state,
          isLoading: false,
          cartItems: action.payload.cartItems,
          totalCartValue: action.payload.totalMrpAmount,
          totalDisAmount : action.payload.totalDisAmount,
          errorMessage: null
        };
  
      case "UPDATE_CART_SUCCESS":
        return {
          ...state,
          isLoading: false,
          cartItems: state.cartItems.map(item =>
            item._id === action.payload._id ? { ...item, quantity: action.payload.quantity, price: action.payload.price } : item
          ),
          errorMessage: null
        };
  
      case "REMOVE_CART_SUCCESS":
        return {
          ...state,
          isLoading: false,
          cartItems: state.cartItems.filter(item => item._id !== action.payload),
          errorMessage: null
        };
  
      case "ADD_TO_CART_FAILURE":
      case "GET_CART_FAILURE":
      case "UPDATE_CART_FAILURE":
      case "REMOVE_CART_FAILURE":
        return {
          ...state,
          isLoading: false,
          errorMessage: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  