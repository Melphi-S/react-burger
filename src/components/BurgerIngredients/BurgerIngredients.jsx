import { useState, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { ingredientTypes } from "../../utils/consts";
import IngredientsContext from "../../context/ingredientsContext";
import ConstructorContext from "../../context/constructorContext";
import styles from "./BurgerIngredients.module.scss";

const BurgerIngredients = () => {
  const bun = ingredientTypes.bun;
  const sauce = ingredientTypes.sauce;
  const main = ingredientTypes.main;
  const [current, setCurrent] = useState(bun);
  const [ingredientInfo, setIngredeintInfo] = useState(null);
  const [isIngredientInfoOpened, setisIngredientInfoOpened] = useState(false);

  const {constructorState, constructorDispatcher} = useContext(ConstructorContext);

  const ingredients = useContext(IngredientsContext);

  const openModal = (ingredient) => {
    setIngredeintInfo(ingredient);
    setisIngredientInfoOpened(true);
  };

  const closeModal = () => {
    setisIngredientInfoOpened(false);
    setIngredeintInfo(null);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeModal();
  };

  const addIngredient = (ingredient) => {
    constructorDispatcher({type: "add", ingredient: ingredient} )
  }

  const countNumber = (ingredient) => {
    if (ingredient.type !== bun) {
      const sameIngredients = constructorState.toppingIds.filter(
        (id) => id === ingredient._id
      );
      return sameIngredients.length;
    }
    return constructorState.bunId === ingredient._id ? 2 : 0;
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
                      addIngredient(ingredient);
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
                      addIngredient(ingredient);
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
                      addIngredient(ingredient);
                    }}
                  />
                )
            )}
          </ul>
        </div>
      </div>

      {isIngredientInfoOpened && (
        <Modal closeModal={closeModal} onEscKeydown={handleEscKeydown}>
          <IngredientDetails ingredient={ingredientInfo} />
        </Modal>
      )}
    </>
  );
};


export default BurgerIngredients;
