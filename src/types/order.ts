import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  CLOSE_ORDER_INFO,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../services/actions/order";

export type TOrder = {
  ingredients: Array<string>;
};

export type TOrderInfo = {
  _id: string;
  ingredients: Array<string>;
  owner: string;
  status: TStatusActions;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  __v?: number;
};

export type TOrderState = {
  postOrderRequest: boolean,
  postOrderFailed: boolean,
  getOrderRequest: boolean,
  getOrderFailed: boolean,
  orderInfo: TOrderInfo | "notFound" | null,
  orderNumber: number | null,
  isOrderInfoOpened: boolean,
}

export type TOrderActions =
  | TPostOrderRequestAction
  | TPostOrderSuccessAction
  | TPostOrderFailedAction
  | TCloseOrderInfoAction
  | TGetOrderRequestAction
  | TGetOrderSuccessAction
  | TGetOrderFailedAction;

export type TPostOrderRequestAction = {
  readonly type: typeof POST_ORDER_REQUEST;
};

export type TPostOrderSuccessAction = {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly payload: number;
};

export type TPostOrderFailedAction = {
  readonly type: typeof POST_ORDER_FAILED;
};

export type TCloseOrderInfoAction = {
  readonly type: typeof CLOSE_ORDER_INFO;
};

export type TGetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST;
};

export type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: TOrderInfo;
};

export type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED;
};

export type TStatusActions = "created" | "pending" | "done";

export enum OrderStatusesEnum {
  created = "Создан",
  pending = "Готовится",
  done = "Выполнен",
}
