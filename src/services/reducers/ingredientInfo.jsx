import {
  OPEN_INGREDIENT_INFO,
  CLOSE_INGREDIENT_INFO,
} from "../actions/ingredientInfo";

const ingredientsInitialState = {
  viewedIngredient: null
};

export const ingredientInfoReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_INFO:
      return {
        viewedIngredient: action.payload,
      };
    case CLOSE_INGREDIENT_INFO:
      return ingredientsInitialState;
    default:
      return state;
  }
};
