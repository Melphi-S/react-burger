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
import { TWsOrdersActions, TWsOrdersState } from "../../types/wsOrders";

const wsOrdersInitialState: TWsOrdersState = {
  isUserConnection: false,
  isPublicConnection: false,
  userConnectionError: null,
  publicConnectionError: null,
  userOrders: null,
  publicOrders: null,
};

export const wsOrdersReducer = (state = wsOrdersInitialState, action: TWsOrdersActions) => {
  switch (action.type) {
    case WS_USER_SUCCESS:
      return {
        ...state,
        isUserConnection: true,
        userConnectionError: null,
      };
    case WS_PUBLIC_SUCCESS:
      return {
        ...state,
        isPublicConnection: true,
        publicConnectionError: null,
      };
    case WS_USER_ERROR:
      return {
        ...state,
        isUserConnection: false,
        userConnectionError: action.payload,
        userOrders: null,
      };
    case WS_PUBLIC_ERROR:
      return {
        ...state,
        isPublicConnection: false,
        publicConnectionError: action.payload,
        publicOrders: null,
      };
    case WS_USER_CLOSED:
      return {
        ...state,
        isUserConnection: false,
        userConnectionError: null,
        userOrders: null,
      };
    case WS_PUBLIC_CLOSED:
      return {
        ...state,
        isPublicConnection: false,
        publicConnectionError: null,
        publicOrders: null,
      };
    case WS_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
      };
    case WS_PUBLIC_ORDERS:
      return {
        ...state,
        publicOrders: action.payload,
      };
    default:
      return state;
  }
};
