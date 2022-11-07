import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
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

  const { ingredients } = useSelector((state) => state.ingredients);

  const { isViewedIngredient, viewedIngredient } = useSelector(
    (state) => state.ingredientInfo
  );

  const dispatch = useDispatch();

  const openModal = (ingredient) => {
    dispatch(openInfo(ingredient));
  };

  const closeModal = () => {
    dispatch(closeInfo());
  };

  const handleRightClick = (ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  const onTabClick = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [bunRef, inViewBun] = useInView({
    threshold: 0,
  });

  const [mainRef, inViewMain] = useInView({
    threshold: 0,
  });
  const [sauceRef, inViewSauce] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrent(bun);
    } else if (inViewSauce) {
      setCurrent(sauce);
    } else if (inViewMain) {
      setCurrent(main);
    }
  }, [inViewBun, inViewMain, inViewSauce, bun, main, sauce]);

  const buns = useMemo(
    () =>
      ingredients.map(
        (ingredient) =>
          ingredient.type === bun && (
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

  const mains = useMemo(
    () =>
      ingredients.map(
        (ingredient) =>
          ingredient.type === main && (
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

  const sauces = useMemo(
    () =>
      ingredients.map(
        (ingredient) =>
          ingredient.type === sauce && (
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
      <div>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <nav style={{ display: "flex" }}>
          <Tab
            value={`${bun}`}
            active={current === bun}
            onClick={() => onTabClick(bun)}
          >
            Булки
          </Tab>
          <Tab
            value={`${sauce}`}
            active={current === sauce}
            onClick={() => onTabClick(sauce)}
          >
            Соусы
          </Tab>
          <Tab
            value={`${main}`}
            active={current === main}
            onClick={() => onTabClick(main)}
          >
            Начинки
          </Tab>
        </nav>
        <div className={`${styles.burgerIngredients} mt-10`}>
          <h2 id={bun} className="text text_type_main-medium" ref={bunRef}>
            Булки
          </h2>
          <ul className={`${styles.ingredientSet} pl-4 mt-6 mb-6`}>{buns}</ul>
          <h2
            id={sauce}
            className="text text_type_main-medium mt-10"
            ref={sauceRef}
          >
            Соусы
          </h2>
          <ul className={`${styles.ingredientSet} pl-4 mt-6 mb-6`}>{sauces}</ul>
          <h2
            id={main}
            className="text text_type_main-medium mt-10"
            ref={mainRef}
          >
            Начинки
          </h2>
          <ul className={`${styles.ingredientSet} pl-4 mt-6 mb-6`}>{mains}</ul>
        </div>
      </div>

      {isViewedIngredient && (
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={viewedIngredient} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
