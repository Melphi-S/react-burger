import { useState } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { ingredient } from "../../utils/consts";
import styles from "./BurgerConstructor.module.scss";
import PropTypes from "prop-types";

const BurgerConstructor = ({ ingredients, selectedIngredientIds }) => {
  const [ingredientIds, setSelectedIds] = useState(selectedIngredientIds);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const bun = ingredients.find(
    (ingredient) => ingredient._id === ingredientIds.bunId
  );
  const selectedIngredients = ingredientIds.toppingIds.map((id) =>
    ingredients.find((ingredient) => ingredient._id === id)
  );
  const totalPrice =
    bun.price * 2 +
    selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);

  const openModal = () => {
    setIsOrderDetailsOpened(true);
  };

  const closeModal = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeModal();
  };

  return (
    <>
      <div className={`${styles.burgerConstructor} mt-25`}>
        <div className="pr-5">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={`${styles.burgerConstructor__list} pl-1 pr-4`}>
          {selectedIngredients.map((ingredient, index) => (
            <li className={styles.burgerConstructor__item} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>
        <div className="pr-5">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>

        <div
          className={`${styles.burgerConstructor__buttonContainer} mt-6 pr-4`}
        >
          <div className={`${styles.burgerConstructor__totalPrice} mr-10`}>
            <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openModal}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      {isOrderDetailsOpened && (
        <Modal closeModal={closeModal} onEscKeydown={handleEscKeydown}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient).isRequired,
  selectedIngredientIds: PropTypes.shape({
    bunId: PropTypes.string,
    toppingIds: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default BurgerConstructor;
