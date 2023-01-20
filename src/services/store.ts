import { compose, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { wsMiddleware } from "./middlewares/wsMiddleware";
import {
  WS_USER_START,
  WS_PUBLIC_START,
  WS_USER_SUCCESS,
  WS_PUBLIC_SUCCESS,
  WS_USER_ERROR,
  WS_PUBLIC_ERROR,
  WS_USER_CLOSED,
  WS_PUBLIC_CLOSED,
  WS_USER_ORDERS,
  WS_PUBLIC_ORDERS,
} from "./actions/wsOrders";
import { ORDERS_URL } from "../utils/consts";
import { TWsMiddlewareActions } from "../types/wsOrders";

const wsUserActions: TWsMiddlewareActions = {
  wsInit: WS_USER_START,
  onOpen: WS_USER_SUCCESS,
  onClose: WS_USER_CLOSED,
  onError: WS_USER_ERROR,
  onMessage: WS_USER_ORDERS,
};

const wsPublicActions: TWsMiddlewareActions = {
  wsInit: WS_PUBLIC_START,
  onOpen: WS_PUBLIC_SUCCESS,
  onClose: WS_PUBLIC_CLOSED,
  onError: WS_PUBLIC_ERROR,
  onMessage: WS_PUBLIC_ORDERS,
};

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composeEnhancers =
//   typeof window === "object" &&
//   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(
//     thunk,
//     wsMiddleware(ORDERS_URL, wsUserActions),
//     wsMiddleware(`${ORDERS_URL}/all`, wsPublicActions)
//   )
// );

// export const store = createStore(rootReducer, enhancer);

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      wsMiddleware(ORDERS_URL, wsUserActions),
      wsMiddleware(`${ORDERS_URL}/all`, wsPublicActions)
    )
  )
);
