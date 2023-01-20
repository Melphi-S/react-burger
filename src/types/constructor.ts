import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  SORT_CONSTRUCTOR,
} from "../services/actions/constructor";
import { TIngredient } from "./ingredients";

export type TConstructorActions =
  | TAddIngredientAction
  | TDeleteIngredientAction
  | TResetConstructorAction
  | TSortConstructorAction;

export type TConstructorState = {
  selectedToppings: Array<TIngredient>;
  selectedBun: TIngredient | null;
};

export type TAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: { ingredient: TIngredient; id: string };
};

export type TDeleteIngredientAction = {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: TIngredient;
};

export type TResetConstructorAction = {
  readonly type: typeof RESET_CONSTRUCTOR;
};

export type TSortConstructorAction = {
  readonly type: typeof SORT_CONSTRUCTOR;
  readonly payload: Array<TIngredient>;
};
