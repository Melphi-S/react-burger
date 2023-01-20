import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  CLOSE_ORDER_INFO,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../services/actions/order";
import { TIngredient } from "./ingredients";

export type TOrder = {
  ingredients: Array<TIngredient>;
};

export type TOrderInfo = {
  _id: string;
  ingredients: Array<TIngredient>;
  owner: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  __v?: number;
};

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
