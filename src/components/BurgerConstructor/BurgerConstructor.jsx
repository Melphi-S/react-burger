import { useState, useContext, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import Topping from "../Topping/Topping";
import {
  addIngredient,
  deleteIngredient,
  resetConstructor,
} from "../../services/actions/constructor";
import { postOrder, closeOrderInfo } from "../../services/actions/order";
import styles from "./BurgerConstructor.module.scss";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { selectedToppings, selectedBun } = useSelector(
    (state) => state.burgerConstructor
  );

  const { isOrderInfoOpened, orderNumber, orderFailed } = useSelector(
    (state) => state.order
  );

  const countTotalPrice = () => {
    const bunsPrice = selectedBun ? selectedBun.info.price * 2 : 0;
    const toppingPrice = selectedToppings.reduce(
      (sum, ingredient) => sum + ingredient.info.price,
      0
    );
    return bunsPrice + toppingPrice;
  };

  const closeModal = () => {
    !orderFailed && dispatch(resetConstructor());
    dispatch(closeOrderInfo());
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeModal();
  };

  const handleDeleteButton = (ingredient) => {
    dispatch(deleteIngredient(ingredient));
  };

  const newOrder =
    selectedToppings.length && selectedBun
      ? {
          ingredients: [
            ...selectedToppings.map((topping) => topping.info._id),
            selectedBun.info._id,
          ],
        }
      : null;

  const makeNewOrder = (order) => {
    dispatch(postOrder(order));
  };

  const handleDrop = (ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      handleDrop(ingredient);
    },
  });

  const renderCard = useCallback((ingredient, index) => {
    return (
      <Topping
        ingredient={ingredient}
        key={ingredient.id}
        index={index}
        handleClose={() => handleDeleteButton(ingredient)}
      ></Topping>
    );
  }, []);

  return (
    <>
      <div
        className={`${styles.burgerConstructor} mt-25 ${
          isHover && styles.dropHover
        }`}
        ref={dropTarget}
      >
        {selectedBun ? (
          <div className="pr-5">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${selectedBun.info.name} (верх)`}
              price={selectedBun.info.price}
              thumbnail={selectedBun.info.image}
            />
          </div>
        ) : (
          <p className="text text_type_main-large mt-5 mb-5 pr-5">
            Выберите булку
          </p>
        )}
        {selectedToppings.length ? (
          <ul
            className={`${styles.burgerConstructor__list} pl-1 pr-4`}
          >
            {selectedToppings.map((ingredient, index) =>
              renderCard(ingredient, index)
            )}
          </ul>
        ) : (
          <p className="text text_type_main-large mt-5 mb-5 pr-5">
            Выберите начинки
          </p>
        )}
        {!!selectedBun && (
          <div className="pr-5">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${selectedBun.info.name} (низ)`}
              price={selectedBun.info.price}
              thumbnail={selectedBun.info.image}
            />
          </div>
        )}

        <div
          className={`${styles.burgerConstructor__buttonContainer} mt-6 pr-4`}
        >
          <div className={`${styles.burgerConstructor__totalPrice} mr-10`}>
            <p className="text text_type_digits-medium mr-2">
              {countTotalPrice()}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => makeNewOrder(newOrder)}
            disabled={!selectedToppings.length || !selectedBun}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      {isOrderInfoOpened && (
        <Modal closeModal={closeModal} onEscKeydown={handleEscKeydown}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
