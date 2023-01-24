import {
  TWsUserStartAction,
  TWsPulicStartAction,
  TWsUserClosedAction,
  TWsPublicClosedAction,
} from "../../types/wsOrders";

export const WS_USER_START: "WS_USER_START" = "WS_USER_START";
export const WS_PUBLIC_START: "WS_PUBLIC_START" = "WS_PUBLIC_START";
export const WS_USER_SUCCESS: "WS_USER_SUCCESS" = "WS_USER_SUCCESS";
export const WS_PUBLIC_SUCCESS: "WS_PUBLIC_SUCCESS" = "WS_PUBLIC_SUCCESS";
export const WS_USER_ERROR: "WS_USER_ERROR" = "WS_USER_ERROR";
export const WS_PUBLIC_ERROR: "WS_PUBLIC_ERROR" = "WS_PUBLIC_ERROR";
export const WS_USER_CLOSED: "WS_USER_CLOSED" = "WS_USER_CLOSED";
export const WS_PUBLIC_CLOSED: "WS_PUBLIC_CLOSED" = "WS_PUBLIC_CLOSED";
export const WS_USER_ORDERS: "WS_USER_ORDERS" = "WS_USER_ORDERS";
export const WS_PUBLIC_ORDERS: "WS_PUBLIC_ORDERS" = "WS_PUBLIC_ORDERS";

export const startUserWsConnection = (token: string): TWsUserStartAction => {
  return {
    type: WS_USER_START,
    payload: `?token=${token}`,
  };
};

export const startPublicWsConnection = (): TWsPulicStartAction => {
  return {
    type: WS_PUBLIC_START,
  };
};

export const closeUserWsConnection = (): TWsUserClosedAction => {
  return {
    type: WS_USER_CLOSED,
  };
};

export const closePublicWsConnection = (): TWsPublicClosedAction => {
  return {
    type: WS_PUBLIC_CLOSED,
  };
};
