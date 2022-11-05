import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { ingredientTypes } from "../../utils/consts";
import { addIngredient } from "../../services/actions/constructor";
import { openInfo, closeInfo } from "../../services/actions/ingredientInfo";
import styles from "./BurgerIngredients.module.scss";

const BurgerIngredients = () => {
  const bun = ingredientTypes.bun;
  const sauce = ingredientTypes.sauce;
  const main = ingredientTypes.main;
  const [current, setCurrent] = useState(bun);

  const { ingredients } = useSelector(state => state.ingredients);
  const { selectedToppings, selectedBun } = useSelector(state => state.burgerConstructor)
  const { isViewedIngredient, viewedIngredient} = useSelector(state => state.ingredientInfo)

  const dispatch = useDispatch();

  const openModal = (ingredient) => {
    dispatch(openInfo(ingredient))
  };

  const closeModal = () => {
    dispatch(closeInfo())
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeModal();
  };

  const handleRightClick = (ingredient) => {
    dispatch(addIngredient(ingredient))
  }

  const countNumber = (ingredient) => {
    if (ingredient.type !== bun) {
      const sameIngredients = selectedToppings.filter(
        (topping) => topping.info._id === ingredient._id
      );
      return sameIngredients.length;
    }
    return selectedBun ? (selectedBun.info._id === ingredient._id ? 2 : 0) : 0;
  };

  return (
    <>
      <div>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <nav style={{ display: "flex" }}>
          <Tab value={`${bun}`} active={current === bun} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab
            value={`${sauce}`}
            active={current === sauce}
            onClick={setCurrent}
          >
            Соусы
          </Tab>
          <Tab value={`${main}`} active={current === main} onClick={setCurrent}>
            Начинки
          </Tab>
        </nav>
        <div className={`${styles.burgerIngredients} mt-10`}>
          <h2 id={`${bun}`} className="text text_type_main-medium">
            Булки
          </h2>
          <ul className={`${styles.ingredientSet} pl-4 mt-6 mb-6`}>
            {ingredients.map(
              (ingredient) =>
                ingredient.type === bun && (
                  <Ingredient
                    key={ingredient._id}
                    ingredient={ingredient}
                    count={countNumber(ingredient)}
                    onLeftClick={() => openModal(ingredient)}
                    onRightClick={(evt) => {
                      evt.preventDefault();
                      handleRightClick(ingredient);
                    }}
                  />
                )
            )}
          </ul>
          <h2 id={`${sauce}`} className="text text_type_main-medium mt-10">
            Соусы
          </h2>
          <ul className={`${styles.ingredientSet} pl-4 mt-6 mb-6`}>
            {ingredients.map(
              (ingredient) =>
                ingredient.type === sauce && (
                  <Ingredient
                    key={ingredient._id}
                    ingredient={ingredient}
                    count={countNumber(ingredient)}
                    onLeftClick={() => openModal(ingredient)}
                    onRightClick={(evt) => {
                      evt.preventDefault();
                      handleRightClick(ingredient);
                    }}
                  />
                )
            )}
          </ul>
          <h2 id={`${main}`} className="text text_type_main-medium mt-10">
            Начинки
          </h2>
          <ul className={`${styles.ingredientSet} pl-4 mt-6 mb-6`}>
            {ingredients.map(
              (ingredient) =>
                ingredient.type === main && (
                  <Ingredient
                    key={ingredient._id}
                    ingredient={ingredient}
                    count={countNumber(ingredient)}
                    onLeftClick={() => openModal(ingredient)}
                    onRightClick={(evt) => {
                      evt.preventDefault();
                      handleRightClick(ingredient);
                    }}
                  />
                )
            )}
          </ul>
        </div>
      </div>

      {isViewedIngredient && (
        <Modal closeModal={closeModal} onEscKeydown={handleEscKeydown}>
          <IngredientDetails ingredient={viewedIngredient} />
        </Modal>
      )}
    </>
  );
};


export default BurgerIngredients;
