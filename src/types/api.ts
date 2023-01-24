import { TIngredient } from "./ingredients";
import { TUserInfo } from "./user";
import { TOrderInfo } from "./order";

export type TResponse<T> = {
  success: boolean;
} & T;

export type TMessage = {
  message: string;
};

export type TIngredientsResponse = {
  data: Array<TIngredient>;
};

export type TUserResponse = {
  user: TUserInfo;
};

export type TPostOrderResponse = {
  name: string;
  order: TOrderInfo;
};

export type TGetOrderResponse = {
  orders: Array<TOrderInfo>;
};

export type TLoginResponse = TRefreshToken & TUserResponse;

export type TRefreshToken = {
  accessToken: string;
  refreshToken: string;
};