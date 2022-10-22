import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.scss";
import PropTypes from "prop-types";

const Ingredient = ({ ingredient, count, onLeftClick, onRightClick }) => {
  return (
    <li className={styles.ingredient} onClick={onLeftClick} onContextMenu={onRightClick}>
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
      {count > 0 && <Counter count={count} size="default" />}
    </li>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
  count: PropTypes.number,
  onLeftClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
};

export default Ingredient;
