import { GET_PRODUCTS} from "./Action";

const initialState = {
  products: [],
  loading:true,
  error:null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCTS_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case "PRODUCTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;

