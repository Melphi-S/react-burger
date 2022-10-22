import { useState, useContext, useEffect } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientsContext from "../../context/ingredientsContext";
import ConstructorContext from "../../context/constructorContext";
import { currentApi } from "../../utils/Api";
import styles from "./BurgerConstructor.module.scss";

const BurgerConstructor = () => {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const { constructorState } =
    useContext(ConstructorContext);
  const ingredients = useContext(IngredientsContext);

  const bun = ingredients.find(
    (ingredient) => ingredient._id === constructorState.bunId
  );
  const selectedIngredients = constructorState.toppingIds.map((id) =>
    ingredients.find((ingredient) => ingredient._id === id)
  );

  const countTotalPrice = () => {
    const bunsPrice = bun ? bun.price * 2 : 0;
    const toppingPrice = selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    return bunsPrice + toppingPrice;
  }


  const openModal = () => {
    setIsOrderDetailsOpened(true);
  };

  const closeModal = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeModal();
  };

  const newOrder = {
    ingredients: [...constructorState.toppingIds, constructorState.bunId],
  };

  const makeNewOrder = () => {
    currentApi
      .postOrder(newOrder)
      .then((res) => {
        setOrderNumber(res.order.number);
        openModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={`${styles.burgerConstructor} mt-25`}>
        {bun && (
          <div className="pr-5">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        {selectedIngredients.length && (
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
        )}
        {bun && (
        <div className="pr-5">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        )}

        <div
          className={`${styles.burgerConstructor__buttonContainer} mt-6 pr-4`}
        >
          <div className={`${styles.burgerConstructor__totalPrice} mr-10`}>
            <p className="text text_type_digits-medium mr-2">{countTotalPrice()}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={makeNewOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      {isOrderDetailsOpened && (
        <Modal closeModal={closeModal} onEscKeydown={handleEscKeydown}>
          <OrderDetails number={orderNumber}/>
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
