import {
  WS_USER_SUCCESS,
  WS_PUBLIC_SUCCESS,
  WS_USER_ERROR,
  WS_PUBLIC_ERROR,
  WS_USER_CLOSED,
  WS_PUBLIC_CLOSED,
  WS_USER_ORDERS,
  WS_PUBLIC_ORDERS,
} from "../actions/wsOrders";

const wsOrdersInitialState = {
  isOpenConnection: false,
  connectionError: null,
  orders: null,
};

export const wsOrdersReducer = (state = wsOrdersInitialState, action) => {
  switch (action.type) {
    case WS_USER_SUCCESS:
    case WS_PUBLIC_SUCCESS:
      return {
        ...state,
        isOpenConnection: false,
        connectionError: null,
      };
    case WS_USER_ERROR:
    case WS_PUBLIC_ERROR:
      return {
        ...state,
        isOpenConnection: false,
        connectionError: action.payload,
        orders: null,
      };
    case WS_USER_CLOSED:
    case WS_PUBLIC_CLOSED:
      return {
        ...wsOrdersInitialState,
      };
    case WS_USER_ORDERS:
    case WS_PUBLIC_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
