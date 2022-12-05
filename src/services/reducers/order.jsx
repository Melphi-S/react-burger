import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_INFO,
} from "../actions/order";

const orderInitialState = {
  postOrderRequest: false,
  postOrderFailed: false,
  getOrderRequest: false,
  getOrderFailed: false,
  orderInfo: null,
  orderNumber: null,
  isOrderInfoOpened: false,
};

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return {
        ...state,
        postOrderRequest: true,
        isOrderInfoOpened: true,
      };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        postOrderRequest: false,
        postOrderFailed: false,
        orderNumber: action.payload,
      };
    case POST_ORDER_FAILED:
      return {
        ...state,
        postOrderRequest: false,
        postOrderFailed: true,
        isOrderInfoOpened: true,
      };
    case GET_ORDER_REQUEST:
      return {
        ...state,
        getOrderRequest: true,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        getOrderRequest: false,
        getOrderFailed: false,
        orderInfo: action.payload,
      };
    case GET_ORDER_FAILED:
      return {
        ...state,
        getOrderRequest: false,
        getOrderFailed: true,
        orderInfo: null,
      };
    case CLOSE_ORDER_INFO:
      return orderInitialState;
    default:
      return state;
  }
};
