import { useMemo, FC } from "react";
import { useSelector } from "../../types/store";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import {
  FormattedDate,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderBrief.module.scss";
import { TOrderInfo, OrderStatusesEnum } from "../../types/order";
import { TIngredient } from "../../types/ingredients";

type TOrderBriefProps = {
  order: TOrderInfo;
  forUser: boolean;
};

export type TIngredientCount = {
  count: number;
} & TIngredient;

const OrderBrief: FC<TOrderBriefProps> = ({ order, forUser }) => {
  const location = useLocation();
  const { path } = useRouteMatch();
  const { createdAt, ingredients, name, number, status } = order;
  const ingredientsInfo = useSelector((state) => state.ingredients.ingredients);

  const selectedIngredients = useMemo(() => {
    const ingredientsList = ingredients.reduce(
      (arr: TIngredient[], ingredient) => {
        const myIngredient = ingredientsInfo.find(
          (ingredientInfo) => ingredientInfo._id === ingredient
        );
        return myIngredient ? [...arr, myIngredient] : arr;
      },
      []
    );
    const ingredientsCount = ingredientsList.reduce(
      (arr: Array<TIngredientCount>, ingredient) => {
        let currentIngredient = arr.find(
          (arrIngrredient) => arrIngrredient._id === ingredient._id
        );
        if (currentIngredient) {
          currentIngredient.count += 1;
        } else {
          let currentIngredient = {
            count: 1,
            ...ingredient,
          };
          arr.push(currentIngredient);
        }
        return arr;
      },
      []
    );
    return ingredientsCount;
  }, [ingredients, ingredientsInfo]);

  const totalPrice = useMemo(
    () =>
      selectedIngredients.reduce(
        (total, ingredient) => (total += ingredient.price * ingredient.count),
        0
      ),
    [selectedIngredients]
  );

  const hiddenImagesCount = useMemo(
    () =>
      selectedIngredients.length > 5 ? selectedIngredients.length - 5 : null,
    [selectedIngredients]
  );

  const headerNumber = useMemo(
    () => `#${String(number).padStart(6, "0")}`,
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
        <h3 className="text text_type_main-medium mt-6">{name}</h3>
        {forUser && (
          <span
            className={`text text_type_main-small mt-2 ${
              status === "done" ? styles.orderBrief__doneStatus : null
            }`}
          >
            {OrderStatusesEnum[status]}
          </span>
        )}
        <div className={`${styles.orderBrief__flexContainer} mt-6`}>
          <ul className={styles.orderBrief__imageList}>
            {selectedIngredients.map(
              (ingredient, index) =>
                index < 6 && (
                  <li
                    className={styles.orderBrief__imageContainer}
                    key={ingredient._id}
                    style={{ zIndex: 6 - index }}
                  >
                    <img
                      className={styles.orderBrief__image}
                      src={ingredient.image}
                      alt={ingredient.name}
                    />
                    {index < 5 && ingredient.count > 1 && (
                      <Counter
                        count={ingredient.count}
                        size="small"
                        extraClass={styles.orderBrief__counter}
                      />
                    )}
                    {index === 5 && (
                      <>
                        <div className={styles.orderBrief__imageOverlay}></div>
                        <span
                          className={`${styles.orderBrief__hiddenCount} text text_type_main-small`}
                        >{`+${hiddenImagesCount}`}</span>
                      </>
                    )}
                  </li>
                )
            )}
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
