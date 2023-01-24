import { useMemo, FC } from "react";
import { useSelector } from "../../types/store";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.scss";
import { TIngredient, IngredientEnum } from "../../types/ingredients";

type TIngredientProps = {
  ingredient: TIngredient;
  onRightClick: (evt: React.MouseEvent<HTMLLIElement>) => void;
};

const Ingredient: FC<TIngredientProps> = ({ ingredient, onRightClick }) => {
  const location = useLocation();

  const bun = IngredientEnum.bun;

  const { selectedToppings, selectedBun } = useSelector(
    (state) => state.burgerConstructor
  );

  const countNumber = useMemo(() => {
    if (ingredient.type !== bun) {
      const sameIngredients = selectedToppings.filter(
        (topping) => topping.info._id === ingredient._id
      );
      return sameIngredients.length;
    }
    return selectedBun ? (selectedBun.info._id === ingredient._id ? 2 : 0) : 0;
  }, [selectedToppings, selectedBun, bun, ingredient]);

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: { ...ingredient },
  });

  return (
    <li onContextMenu={onRightClick} ref={dragRef}>
      <Link
        className={styles.ingredient}
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location },
        }}
      >
        <img
          className={`${styles.ingredient__image} mr-4 ml-4`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${styles.ingredient__price} mt-1 mb-1`}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={`${styles.ingredient__name} text text_type_main-default pb-6`}
        >
          {ingredient.name}
        </p>
        {countNumber > 0 && <Counter count={countNumber} size="default" />}
      </Link>
    </li>
  );
};

export default Ingredient;
