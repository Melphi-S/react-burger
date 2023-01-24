import { currentApi } from "../../utils/Api";
import { getCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../../types/store";
import { TOrder, TCloseOrderInfoAction } from "../../types/order";

export const POST_ORDER_REQUEST: "POST_ORDER_REQUEST" = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS: "POST_ORDER_SUCCESS" = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED: "POST_ORDER_FAILED" = "POST_ORDER_FAILED";
export const CLOSE_ORDER_INFO: "CLOSE_ORDER_INFO" = "CLOSE_ORDER_INFO";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export const postOrder: AppThunk = (order: TOrder) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    currentApi
      .postOrder(order, getCookie("accessToken"))
      .then(
        (res) =>
          res &&
          res.success &&
          dispatch({
            type: POST_ORDER_SUCCESS,
            payload: res.order.number,
          })
      )
      .catch((err) =>
        dispatch({
          type: POST_ORDER_FAILED,
        })
      );
  };
};

export const getOrder: AppThunk = (orderNumber: number) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    currentApi
      .getOrder(orderNumber)
      .then(
        (res) =>
          res &&
          res.success &&
          dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res.orders[0],
          })
      )
      .catch((err) =>
        dispatch({
          type: GET_ORDER_FAILED,
        })
      );
  };
};

export const closeOrderInfo = (): TCloseOrderInfoAction => ({
  type: CLOSE_ORDER_INFO,
});
