import { useState, useEffect, FC } from "react";
import { useInView } from "react-intersection-observer";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsSet from "../IngredientsSet/IngredientsSet";
import styles from "./BurgerIngredients.module.scss";
import { IngredientEnum } from "../../types/ingredients";

const BurgerIngredients: FC = () => {
  const bun = IngredientEnum.bun;
  const sauce = IngredientEnum.sauce;
  const main = IngredientEnum.main;
  const [current, setCurrent] = useState(bun);

  const onTabClick = (tab: IngredientEnum) => {
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
    <div>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
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
        <IngredientsSet type={bun} name={"Булки"} ref={bunRef}></IngredientsSet>
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
  );
};

export default BurgerIngredients;
