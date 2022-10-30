import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  OPEN_INGREDIENT_INFO,
  CLOSE_INGREDIENT_INFO,
  getIngredients
} from "../actions/ingredients";

const ingredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  addedIngredients: [],
  isViewedIngredient: false,
  viewedIngredient: null,
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.payload
      };
      case GET_INGREDIENTS_FAILED:
        return {
          ...state,
          ingredientsRequest: false,
          ingredientsFailed: true
        };
    default:
      return state;
  }
};
