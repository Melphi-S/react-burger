import { useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import { ingredientTypes, ingredient } from "../../utils/consts";
import PropTypes from 'prop-types';
import styles from "./BurgerIngredients.module.scss";

const BurgerIngredients = ({ingredients, selectedIngredientIds}) => {
  const bun = ingredientTypes.bun;
  const sauce = ingredientTypes.sauce;
  const main = ingredientTypes.main;
  const [current, setCurrent] = useState(bun);

  const countNumber = (ingredient) => {
    if (ingredient.type !== bun) {
      const sameIngredients = selectedIngredientIds.toppingIds.filter(id => id === ingredient._id);
      return sameIngredients.length;
    }
    return selectedIngredientIds.bunId === ingredient._id ? 2 : 0;
  }

  return (
    <>
    <div>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <nav style={{ display: "flex" }}>
        <Tab value={`${bun}`} active={current === bun} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value={`${sauce}`} active={current === sauce} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value={`${main}`} active={current === main} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
      <div className={`${styles.burgerIngredients} mt-10`}>
        <h2 id={`${bun}`} className="text text_type_main-medium">Булки</h2>
        <ul className={`${styles.ingredientSet} pl-4 mt-6 mb-6`}>
          {ingredients.map((ingredient) => 
            ingredient.type === bun &&
            <Ingredient
              name={ingredient.name}
              image={ingredient.image}
              price={ingredient.price}
              key={ingredient._id}
              count={countNumber(ingredient)}
            />
          )}
        </ul>
        <h2 id={`${sauce}`} className="text text_type_main-medium mt-10">Соусы</h2>
        <ul className={`${styles.ingredientSet} pl-4 mt-6 mb-6`}>
          {ingredients.map((ingredient) => 
            ingredient.type === sauce &&
            <Ingredient
              name={ingredient.name}
              image={ingredient.image}
              price={ingredient.price}
              key={ingredient._id}
              count={countNumber(ingredient)}
            />
          )}
        </ul>
        <h2 id={`${main}`} className="text text_type_main-medium mt-10">Начинки</h2>
        <ul className={`${styles.ingredientSet} pl-4 mt-6 mb-6`}>
          {ingredients.map((ingredient) => 
            ingredient.type === main &&
            <Ingredient
              name={ingredient.name}
              image={ingredient.image}
              price={ingredient.price}
              key={ingredient._id}
              count={countNumber(ingredient)}
            />
          )}
        </ul>
      </div>
    </div>
    </>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient).isRequired
}


export default BurgerIngredients;
