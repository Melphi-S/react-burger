import { currentApi } from "../../utils/Api";
import { getCookie } from "../../utils/cookie";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const CLOSE_ORDER_INFO = "CLOSE_ORDER_INFO";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const postOrder = (order) => {
  return function (dispatch) {
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

export const getOrder = (orderNumber) => {
  return function (dispatch) {
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
            payload: res.orders.shift(),
          })
      )
      .catch((err) =>
        dispatch({
          type: GET_ORDER_FAILED,
        })
      );
  };
};

export const closeOrderInfo = () => ({
  type: CLOSE_ORDER_INFO,
});
