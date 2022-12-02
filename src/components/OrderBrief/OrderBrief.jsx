import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { orderStatuses } from "../../utils/consts";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderBrief.module.scss";

const OrderBrief = ({ order }) => {
  const location = useLocation();
  const { path } = useRouteMatch();
  const { createdAt, ingredients, name, number, status } = order;
  const ingredientsInfo = useSelector((state) => state.ingredients.ingredients);

  const selectedIngredients = useMemo(
    () =>
      ingredients.map((ingredient) =>
        ingredientsInfo.find(
          (ingredientInfo) => ingredientInfo._id === ingredient
        )
      ),
    [ingredients, ingredientsInfo]
  );

  const totalPrice = useMemo(
    () =>
      selectedIngredients.reduce(
        (total, ingredient) => (total += ingredient.price),
        0
      ),
    [selectedIngredients]
  );

  const hiddenImagesCount = useMemo(
    () => (ingredients.length > 5 ? ingredients.length - 5 : null),
    [ingredients]
  );

  const headerNumber = useMemo(
    () => `#${number < 100000 ? 0 : null}${number}`,
    [number]
  );

  return (
    <li>
      <Link
        className={styles.orderBrief}
        to={{
          pathname: `${path}/${number}`,
          state: { background: location },
        }}
      >
        <div className={styles.orderBrief__flexContainer}>
          <p className="text text_type_digits-default">{headerNumber}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <h3 className="text text_type_main-medium mt-6 mb-2">{name}</h3>
        <p
          className={`text text_type_main-small mb-6 ${
            status === "done" ? styles.orderBrief__doneStatus : null
          }`}
        >
          {orderStatuses[status]}
        </p>
        <div className={styles.orderBrief__flexContainer}>
          <ul className={styles.orderBrief__imageList}>
            {selectedIngredients.map((ingredient, index) => {
              if (index < 6) {
                return (
                  <li
                    className={styles.orderBrief__imageContainer}
                    key={index}
                    style={{ zIndex: 6 - index }}
                  >
                    <img
                      className={styles.orderBrief__image}
                      src={ingredient.image}
                      alt={ingredient.name}
                    />
                    {index === 5 && (
                      <>
                        <div className={styles.orderBrief__imageOverlay}></div>
                        <span
                          className={`${styles.orderBrief__hiddenCount} text text_type_main-small`}
                        >{`+${hiddenImagesCount}`}</span>
                      </>
                    )}
                  </li>
                );
              }
            })}
          </ul>
          <div className={styles.orderBrief__flexContainer}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderBrief;
