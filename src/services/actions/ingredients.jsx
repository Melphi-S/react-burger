import { currentApi } from "../../utils/Api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const ADD_INGREDIENT = "ADD_INGREDIENT ";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export const OPEN_INGREDIENT_INFO = "OPEN_INGREDIENT_INFO";
export const CLOSE_INGREDIENT_INFO = "CLOSE_INGREDIENT_INFO";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    currentApi.getIngredients().then((res) =>
      res
        ? dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: res.data,
          })
        : dispatch({
            type: GET_INGREDIENTS_FAILED,
          })
    );
  };
}
