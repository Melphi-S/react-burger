import React, { useMemo, useCallback, FC } from "react";
import { useSelector, useDispatch } from "../../types/store";
import Ingredient from "../Ingredient/Ingredient";
import { addIngredient } from "../../services/actions/constructor";
import styles from "./IngredientsSet.module.scss";
import { TIngredient } from "../../types/ingredients";

type TIngredientsSetProps = {
  name: string;
  type: string;
};

const IngredientsSet = React.forwardRef<
  HTMLHeadingElement,
  TIngredientsSetProps
>(({ name, type }, ref) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);

  const handleRightClick = useCallback(
    (ingredient: TIngredient) => {
      dispatch(addIngredient(ingredient));
    },
    [dispatch]
  );

  const set = useMemo(
    () =>
      ingredients.map(
        (ingredient) =>
          ingredient.type === type && (
            <Ingredient
              key={ingredient._id}
              ingredient={ingredient}
              onRightClick={(evt) => {
                evt.preventDefault();
                handleRightClick(ingredient);
              }}
            />
          )
      ),
    [ingredients, handleRightClick, type]
  );

  return (
    <>
      <h2 id={type} className="text text_type_main-medium mt-10" ref={ref}>
        {name}
      </h2>
      <ul className={`${styles.ingredientsSet} pl-4 mt-6 mb-6`}>{set}</ul>
    </>
  );
});

export default IngredientsSet;
