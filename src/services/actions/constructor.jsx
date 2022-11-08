import { nanoid } from "nanoid";

export const ADD_INGREDIENT = "ADD_INGREDIENT ";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";
export const SORT_CONSTRUCTOR = "SORT_CONSTRUCTOR";

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: { ingredient: ingredient, id: nanoid(8) },
});

export const deleteIngredient = (ingredient) => ({
  type: DELETE_INGREDIENT,
  payload: ingredient,
});

export const resetConstructor = () => ({
  type: RESET_CONSTRUCTOR,
});

export const sortConstructor = (toppings, dragIndex, hoverIndex) => {
  const dragTopping = toppings[dragIndex];
  toppings.splice(dragIndex, 1);
  toppings.splice(hoverIndex, 0, dragTopping);
  return {
    type: SORT_CONSTRUCTOR,
    payload: [...toppings],
  };
};
