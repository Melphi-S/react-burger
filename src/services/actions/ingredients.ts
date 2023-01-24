import { currentApi } from "../../utils/Api";
import { AppDispatch, AppThunk } from "../../types/store";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    currentApi
      .getIngredients()
      .then(
        (res) =>
          res &&
          res.success &&
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: res.data,
          })
      )
      .catch((err) =>
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
      );
  };
};
