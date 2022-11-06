export const ADD_INGREDIENT = "ADD_INGREDIENT ";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";
export const SORT_CONSTRUCTOR = "SORT_CONSTRUCTOR";

export const addIngredient = (ingredient) => {
  return function (dispatch) {
    dispatch({
      type: ADD_INGREDIENT,
      payload: ingredient,
    });
  };
};

export const deleteIngredient = (ingredient) => {
  return function (dispatch) {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: ingredient,
    });
  };
};

export const resetConstructor = (ingredient) => {
  return function (dispatch) {
    dispatch({
      type: RESET_CONSTRUCTOR,
    });
  };
};

export const sortConstructor = (toppings, dragIndex, dropIndex) => {
  const dragTopping = toppings[dragIndex];
  toppings.splice(dragIndex, 1);
  toppings.splice(dropIndex, 0, dragTopping);
  return function (dispatch) {
    dispatch({
      type: SORT_CONSTRUCTOR,
      payload: [...toppings]
    });
  };
};
