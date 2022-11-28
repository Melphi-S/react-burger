import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsSet from "../IngredientsSet/IngredientsSet";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { ingredientTypes } from "../../utils/consts";
import { closeInfo } from "../../services/actions/ingredientInfo";
import styles from "./BurgerIngredients.module.scss";

const BurgerIngredients = () => {
  const bun = ingredientTypes.bun;
  const sauce = ingredientTypes.sauce;
  const main = ingredientTypes.main;
  const [current, setCurrent] = useState(bun);

  const { viewedIngredient } = useSelector((state) => state.ingredientInfo);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeInfo());
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
        <div className={`${styles.burgerIngredients}`}>
          <IngredientsSet
            type={bun}
            name={"Булки"}
            ref={bunRef}
          ></IngredientsSet>
          <IngredientsSet
            type={sauce}
            name={"Соусы"}
            ref={sauceRef}
          ></IngredientsSet>
          <IngredientsSet
            type={main}
            name={"Начинки"}
            ref={mainRef}
          ></IngredientsSet>
        </div>
      </div>

      {viewedIngredient && (
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={viewedIngredient} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
