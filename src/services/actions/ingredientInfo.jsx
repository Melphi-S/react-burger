export const OPEN_INGREDIENT_INFO = "OPEN_INGREDIENT_INFO";
export const CLOSE_INGREDIENT_INFO = "CLOSE_INGREDIENT_INFO";

export const openInfo = (ingredient) => ({
  type: OPEN_INGREDIENT_INFO,
  payload: ingredient,
});

export const closeInfo = () => ({
  type: CLOSE_INGREDIENT_INFO,
});
