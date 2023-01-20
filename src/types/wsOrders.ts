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
} from "../services/actions/wsOrders";
import { TOrderInfo } from "./order";

export type TWsOrdersActions =
  | TWsUserStartAction
  | TWsPulicStartAction
  | TWsUserSuccessAction
  | TWsPulicSuccessAction
  | TWsUserErrorAction
  | TWsPublicErrorAction
  | TWsUserClosedAction
  | TWsPublicClosedAction
  | TWsUserOrdersAction
  | TWsPublicOrdersAction;

export type TWsMiddlewareActions = {
  wsInit: 'WS_USER_START' | 'WS_PUBLIC_START',
  onOpen: 'WS_USER_SUCCESS' | 'WS_PUBLIC_SUCCESS',
  onClose: 'WS_USER_CLOSED' | 'WS_PUBLIC_CLOSED',
  onError: 'WS_USER_ERROR' | 'WS_PUBLIC_ERROR',
  onMessage: 'WS_USER_ORDERS' | 'WS_PUBLIC_ORDERS'
}

type TOrders = {
  orders: Array<TOrderInfo>;
  total: number;
  totalToday: number;
};

export type TWsOrdersState = {
  isUserConnection: boolean;
  isPublicConnection: boolean;
  userConnectionError: null | string;
  publicConnectionError: null | string;
  userOrders: Array<TOrders> | null;
  publicOrders: Array<TOrders> | null;
};

export type TWsUserStartAction = {
  readonly type: typeof WS_USER_START;
  readonly payload: string;
};

export type TWsPulicStartAction = {
  readonly type: typeof WS_PUBLIC_START;
};

type TWsUserSuccessAction = {
  readonly type: typeof WS_USER_SUCCESS;
};

type TWsPulicSuccessAction = {
  readonly type: typeof WS_PUBLIC_SUCCESS;
};

type TWsUserErrorAction = {
  readonly type: typeof WS_USER_ERROR;
  readonly payload: string;
};

type TWsPublicErrorAction = {
  readonly type: typeof WS_PUBLIC_ERROR;
  readonly payload: string;
};

export type TWsUserClosedAction = {
  readonly type: typeof WS_USER_CLOSED;
};

export type TWsPublicClosedAction = {
  readonly type: typeof WS_PUBLIC_CLOSED;
};

type TWsUserOrdersAction = {
  readonly type: typeof WS_USER_ORDERS;
  readonly payload: Array<TOrders>;
};

type TWsPublicOrdersAction = {
  readonly type: typeof WS_PUBLIC_ORDERS;
  readonly payload: Array<TOrders>;
};
