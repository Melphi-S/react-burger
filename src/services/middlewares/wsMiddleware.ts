import { TWsMiddlewareActions, TWsOrdersActions } from "../../types/wsOrders";
import { Middleware } from "@reduxjs/toolkit";

export const wsMiddleware = (
  wsUrl: string,
  wsActions: TWsMiddlewareActions
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsOrdersActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket =
          type === "WS_USER_START" && action.payload
            ? new WebSocket(`${wsUrl}${action.payload}`)
            : new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  };
};
