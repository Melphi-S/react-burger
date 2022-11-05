import { nanoid } from "nanoid";

import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
} from "../actions/constructor";

const constructorInitialState = {
  selectedToppings: [],
  selectedBun: null,
};

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return action.payload.type !== "bun"
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
    default:
      return state;
  }
};
