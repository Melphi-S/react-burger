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

export type TConstuctorElement = {
  info: TIngredient;
  id: string;
};

export type TConstructorState = {
  selectedToppings: Array<TConstuctorElement>;
  selectedBun: TConstuctorElement | null;
};

export type TAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: { ingredient: TIngredient; id: string };
};

export type TDeleteIngredientAction = {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: TConstuctorElement;
};

export type TResetConstructorAction = {
  readonly type: typeof RESET_CONSTRUCTOR;
};

export type TSortConstructorAction = {
  readonly type: typeof SORT_CONSTRUCTOR;
  readonly payload: Array<TConstuctorElement>;
};
