import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation";
import Topping from "../Topping/Topping";
import {
  addIngredient,
  deleteIngredient,
  resetConstructor,
} from "../../services/actions/constructor";
import { postOrder, closeOrderInfo } from "../../services/actions/order";
import { showInfoBoard } from "../../services/actions/user";
import styles from "./BurgerConstructor.module.scss";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state) => state.user.userInfo);

  const { selectedToppings, selectedBun } = useSelector(
    (state) => state.burgerConstructor
  );

  const { isOrderInfoOpened, orderNumber, orderFailed } = useSelector(
    (state) => state.order
  );

  const countTotalPrice = useMemo(() => {
    const bunsPrice = selectedBun ? selectedBun.info.price * 2 : 0;
    const totalPrice = selectedToppings.reduce(
      (sum, ingredient) => sum + ingredient.info.price,
      bunsPrice
    );
    return totalPrice;
  }, [selectedBun, selectedToppings]);

  const closeModal = () => {
    !orderFailed && dispatch(resetConstructor());
    dispatch(closeOrderInfo());
  };

  const handleDeleteButton = useCallback((ingredient) => {
    dispatch(deleteIngredient(ingredient));
  }, [dispatch]);

  const newOrder = useMemo(
    () =>
      selectedToppings.length && selectedBun
        ? {
            ingredients: [
              selectedBun.info._id,
              ...selectedToppings.map((topping) => topping.info._id),
              selectedBun.info._id,
            ],
          }
        : null,
    [selectedBun, selectedToppings]
  );

  const makeNewOrder = (order) => {
    if (userInfo) {
      dispatch(postOrder(order));
    } else {
      history.push("/login");
      dispatch(showInfoBoard("Unauthorized user"));
    }
  };

  const handleDrop = (ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  const [{ isHover, canDrop }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(ingredient) {
      handleDrop(ingredient);
    },
  });

  const renderIngredients = useMemo(
    () =>
      selectedToppings.map((ingredient, index) => (
        <Topping
          ingredient={ingredient}
          key={ingredient.id}
          index={index}
          handleClose={() => handleDeleteButton(ingredient)}
        ></Topping>
      )),
    [selectedToppings, handleDeleteButton]
  );

  return (
    <>
      <div
        className={`${styles.burgerConstructor} ${
          canDrop & !isHover && styles.dropActive
        } ${isHover && styles.dropHover}`}
        ref={dropTarget}
      >
        <div className={`${styles.burgerConstructor__container}`}>
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
            <ul className={`${styles.burgerConstructor__list} pl-1 pr-4`}>
              {renderIngredients}
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
        </div>

        <div
          className={`${styles.burgerConstructor__buttonContainer} mt-6 pr-4`}
        >
          <div className={`${styles.burgerConstructor__totalPrice} mr-10`}>
            <p className="text text_type_digits-medium mr-2">
              {countTotalPrice}
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
        <Modal closeModal={closeModal}>
          <OrderConfirmation number={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
