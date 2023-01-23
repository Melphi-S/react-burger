import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { store } from "../services/store";
import { TConstructorActions } from "./constructor";
import { TIngredientsActions } from "./ingredients";
import { TOrderActions } from "./order";
import { TUserActions } from "./user";
import { TWsOrdersActions } from "./wsOrders";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TWsOrdersActions;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch | AppThunk = dispatchHook;
