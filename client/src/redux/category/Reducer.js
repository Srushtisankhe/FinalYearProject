const { GET_CATEGORY } = require("./Action");

const initialState = {
  category: [],
};


const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
