import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  SORT_CONSTRUCTOR,
} from "../actions/constructor";
import {
  TConstructorActions,
  TConstructorState,
} from "../../types/constructor";
import { Ingredient } from "../../types/ingredients";

const constructorInitialState: TConstructorState = {
  selectedToppings: [],
  selectedBun: null,
};

export const constructorReducer = (
  state = constructorInitialState,
  action: TConstructorActions
) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return action.payload.ingredient.type !== Ingredient.bun
        ? {
            ...state,
            selectedToppings: [
              ...state.selectedToppings,
              { info: action.payload.ingredient, id: action.payload.id },
            ],
          }
        : {
            ...state,
            selectedBun: {
              info: action.payload.ingredient,
              id: action.payload.id,
            },
          };
    case DELETE_INGREDIENT:
      return {
        ...state,
        selectedToppings: state.selectedToppings.filter(
          (ingredient) => ingredient.id !== action.payload.id
        ),
      };
    case RESET_CONSTRUCTOR:
      return constructorInitialState;
    case SORT_CONSTRUCTOR:
      return {
        ...state,
        selectedToppings: action.payload,
      };
    default:
      return state;
  }
};
