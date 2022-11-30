import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ingredient from "../Ingredient/Ingredient";
import { addIngredient } from "../../services/actions/constructor";
import { openInfo } from "../../services/actions/ingredientInfo";
import styles from "./IngredientsSet.module.scss";
import PropTypes from "prop-types";

const IngredientsSet = React.forwardRef(({ name, type }, ref ) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);

  const openModal = (ingredient) => {
    dispatch(openInfo(ingredient));
  };

  const handleRightClick = (ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  const set = useMemo(
    () =>
      ingredients.map(
        (ingredient) =>
          ingredient.type === type && (
            <Ingredient
              key={ingredient._id}
              ingredient={ingredient}
              onLeftClick={() => openModal(ingredient)}
              onRightClick={(evt) => {
                evt.preventDefault();
                handleRightClick(ingredient);
              }}
            />
          )
      ),
    [ingredients]
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

IngredientsSet.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default IngredientsSet;
