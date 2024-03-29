import styles from "./IngredientDetails.module.scss";
import NotFound from "../../pages/Not-found/Not-found";
import { useParams, useLocation } from "react-router-dom";
import { useMemo, FC } from "react";
import { TIngredient } from "../../types/ingredients";
import { Location } from "history";

type TIngredientDetailsProps = {
  ingredients: Array<TIngredient>;
};

type TParams = {
  id: string;
};

const IngredientDetails: FC<TIngredientDetailsProps> = ({ ingredients }) => {
  const location = useLocation<{ background: Location}>();
  const background = location.state?.background;
  const { id } = useParams<TParams>();

  const ingredient = useMemo(
    () => ingredients?.find((ingredient) => ingredient._id === id),
    [ingredients, id]
  );

  return ingredient ? (
    <div
      className={`${styles.container} ${
        !background && styles.container_fullPage
      }`}
    >
      <h2
        className={`${
          background ? styles.title : styles.title_fullPage
        } text text_type_main-large mb-3`}
      >
        Детали ингредиента
      </h2>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={styles.image}
      />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <ul className={styles.nutritionInfo}>
        <li className={styles.nutritionInfo__item}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </li>
        <li className={styles.nutritionInfo__item}>
          <span className="text text_type_main-default">Белки, г</span>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </li>
        <li className={styles.nutritionInfo__item}>
          <span className="text text_type_main-default">Жиры, г</span>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </li>
        <li className={styles.nutritionInfo__item}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <p className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  ) : (
    <NotFound />
  );
};

export default IngredientDetails;
