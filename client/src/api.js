const API_BASE_URL = "http://localhost:4000/";

const endpoints = {
  user: {
    login: `${API_BASE_URL}user/signin`,
    signup: `${API_BASE_URL}user/signup`,
    getUser: `${API_BASE_URL}user/info`,
    updateProfile: `${API_BASE_URL}user/:user_id`,
  },
  product: {
    all: `${API_BASE_URL}products`,
    details: `${API_BASE_URL}product/:id`, 
    byCategory: `${API_BASE_URL}products/category/`, 
    search: `${API_BASE_URL}products/search`,
    scanmedic:`${API_BASE_URL}products/scanmedicine`
  },
  category: {
    getAllCategories: `${API_BASE_URL}category`, 
    getSingleCategory: `${API_BASE_URL}category/single/:id`,
  },
  subcategory: {
    getSubcategoriesByCategory: `${API_BASE_URL}subcategory/:category`, 
    getSingleSubCategory: `${API_BASE_URL}subcategory/single/:id`,
  },
  order: {
    createOrder: `${API_BASE_URL}order/process`,
    all:`${API_BASE_URL}order/`,
  },
  cart: {
    getCart: `${API_BASE_URL}cart/`, 
    addToCart: `${API_BASE_URL}cart/add`,
    updateCart: `${API_BASE_URL}cart/update`,
    removeCart: `${API_BASE_URL}cart/remove`,
  },
  setmedications:{
    all:`${API_BASE_URL}schedules/`,
    add:`${API_BASE_URL}schedules/`,
    delete: `${API_BASE_URL}schedules/`,
  }
};

const productpath = "http://localhost:4000/uploads/products/"
const categorypath = "http://localhost:4000/uploads/categories/"

export {productpath, categorypath,API_BASE_URL,endpoints};
