import styles from "./IngredientDetails.module.scss";
import PropTypes from "prop-types";

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={`${styles.container} mt-15 mb-15 ml-10 mr-10`}>
      <h2 className={`${styles.title} text text_type_main-large mb-3`}>
        Детали ингредиента
      </h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
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
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default IngredientDetails;
