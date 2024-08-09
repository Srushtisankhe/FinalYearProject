import { combineReducers } from 'redux';
import authReducer from './auth/Reducer';
import categoryReducer from './category/Reducer';
import productReducer from './product/Reducer';
import cartReducer from './cart/Reducer';


const rootReducer = combineReducers({
  auth: authReducer,
  cateStore: categoryReducer,
  proStore:productReducer,
  cart:cartReducer,
});

export default rootReducer;