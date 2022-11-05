import { currentApi } from "../../utils/Api";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const CLOSE_ORDER_INFO = "CLOSE_ORDER_INFO";

export const postOrder = (order) => {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    currentApi
      .postOrder(order)
      .then(
        (res) =>
          res &&
          res.success &&
          dispatch({
            type: POST_ORDER_SUCCESS,
            payload: res.order.number
          })
      )
      .catch((err) =>
        dispatch({
          type: POST_ORDER_FAILED,
        })
      );
  };
};

export const closeOrderInfo = () => {
  return function (dispatch) {
    dispatch({
      type: CLOSE_ORDER_INFO
    });
  };
};
