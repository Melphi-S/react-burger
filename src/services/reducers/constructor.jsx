import { nanoid } from "nanoid";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  SORT_CONSTRUCTOR
} from "../actions/constructor";
import { ingredientTypes } from "../../utils/consts";

const constructorInitialState = {
  selectedToppings: [],
  selectedBun: null,
};

const bun = ingredientTypes.bun

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return action.payload.type !== bun
        ? {
            ...state,
            selectedToppings: [
              ...state.selectedToppings,
              { info: action.payload, id: nanoid(8) },
            ]
          }
        : {
            ...state,
            selectedBun: { info: action.payload, id: nanoid(8) }
          };
    case DELETE_INGREDIENT:
      return {
            ...state,
            selectedToppings: state.selectedToppings.filter((ingredient) => ingredient.id !== action.payload.id)
          }
    case RESET_CONSTRUCTOR:
      return constructorInitialState;
    case SORT_CONSTRUCTOR:
      return {
        ...state,
        selectedToppings: action.payload
      }
    default:
      return state;
  }
};
