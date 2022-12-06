import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useEffect } from "react";
import { getOrder } from "../../services/actions/order";
import { orderStatuses } from "../../utils/consts";
import styles from "./OrderDetails.module.scss";

const OrderDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state?.background;
  const { number } = useParams();

  const { userOrders, publicOrders } = useSelector((state) => state.wsOrders);
  const { orderInfo } = useSelector((state) => state.order);
  const { ingredients } = useSelector((state) => state.ingredients);

  const orders = useMemo(
    () =>
      userOrders
        ? userOrders.orders
        : publicOrders
        ? publicOrders.orders
        : null,
    [userOrders, publicOrders]
  );

  const order =
    orders?.find((order) => order.number === Number(number)) || orderInfo;

  useEffect(() => {
    if (!order) {
      dispatch(getOrder(number));
    }
  }, [order, number, dispatch]);

  const headerNumber = useMemo(
    () => `#${String(number).padStart(6, "0")}`,
    [number]
  );

  const orderIngredients = useMemo(
    () =>
      order?.ingredients.reduce(
        (object, id) => {
          let orderIngredient = object.ingredients.find(
            (ingredient) => ingredient._id === id
          );
          if (orderIngredient) {
            orderIngredient.count++;
          } else {
            orderIngredient = ingredients.find(
              (ingredient) => ingredient._id === id
            );
            object.ingredients.push({
              count: 1,
              ...orderIngredient,
            });
          }
          object.totalPrice += orderIngredient.price;
          return object;
        },
        { ingredients: [], totalPrice: 0 }
      ),

    [order, ingredients]
  );

  return (
    order && (
      <div
        className={`${styles.container} ${
          !background && styles.container_fullPage
        }`}
      >
        <span
          className={`${
            background ? styles.number : styles.number_fullPage
          } text text_type_digits-default pt-5 pb-5 mb-5`}
        >
          {headerNumber}
        </span>
        <h1 className="text text_type_main-medium mb-2">{order.name}</h1>
        <span
          className={`text text_type_main-default ${
            order.status === "done" ? styles.doneStatus : null
          }`}
        >
          {orderStatuses[order.status]}
        </span>
        <div className={styles.ingredients}>
          <h2 className="text text_type_main-medium">Состав:</h2>
          <ul className={styles.ingredients__container}>
            {orderIngredients.ingredients.map((ingredient, index) => (
              <li className={styles.ingredient} key={index}>
                <img
                  className={styles.ingredient__image}
                  src={ingredient.image}
                  alt={ingredient.name}
                ></img>
                <p className="text text_type_main-default">{ingredient.name}</p>
                <div className={styles.ingredient__priceContainer}>
                  <span className="text text_type_digits-default">{`${ingredient.count} x ${ingredient.price}`}</span>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.footer}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
          <div className={styles.ingredient__priceContainer}>
            <span className="text text_type_digits-default">
              {orderIngredients.totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    )
  );
};

export default OrderDetails;
