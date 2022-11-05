import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    CLOSE_ORDER_INFO
  } from "../actions/order";

const orderInitialState = {
    orderRequest: false,
    orderFailed: false,
    orderNumber: null,
    isOrderInfoOpened: false
}

export const orderReducer = (state = orderInitialState, action) => {
    switch (action.type) {
      case POST_ORDER_REQUEST:
        return {
          ...state,
          orderRequest: true
        };
      case POST_ORDER_SUCCESS:
        return {
          ...state,
          orderRequest: false,
          orderFailed: false,
          orderNumber: action.payload,
          isOrderInfoOpened: true
        };
      case POST_ORDER_FAILED:
        return {
          ...state,
          orderRequest: false,
          orderFailed: true,     
          isOrderInfoOpened: true
        };
        case CLOSE_ORDER_INFO:
            return orderInitialState;
      default:
        return state;
    }
  };
  