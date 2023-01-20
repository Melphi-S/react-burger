import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../services/actions/ingredients";

export enum Ingredient {
  bun = "bun",
  sauce = "sauce",
  main = "main",
}

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  proteins: number;
  image: string;
  image_mobile: string;
  image_large: string;
  _id: string;
  name: string;
  type: Ingredient;
  price: number;
  __v: number;
  id: string;
};

export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredient>;
};

export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TIngredientsActions =
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsFailedAction;

export type TIngredientsState = {
  ingredients: Array<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};
