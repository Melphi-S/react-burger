import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredient } from "../../consts/consts";
import styles from "./BurgerConstructor.module.scss";
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {
  return (
    <div className={`${styles.burgerConstructor} mt-25`}>
      <div className="pr-5">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={
            props.ingredients.find(
              (ingredient) => ingredient._id === "60666c42cc7b410027a1a9b1"
            ).image
          }
        />
      </div>
      <ul className={`${styles.burgerConstructor__list} pl-1 pr-4`}>
        <li className={styles.burgerConstructor__item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Соус традиционный галактический"
            price={15}
            thumbnail={
              props.ingredients.find(
                (ingredient) => ingredient._id === "60666c42cc7b410027a1a9b9"
              ).image
            }
          />
        </li>
        <li className={styles.burgerConstructor__item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Мясо бессмертных моллюсков Protostomia"
            price={1339}
            thumbnail={
              props.ingredients.find(
                (ingredient) => ingredient._id === "60666c42cc7b410027a1a9b4"
              ).image
            }
          />
        </li>
        <li className={styles.burgerConstructor__item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={874}
            thumbnail={
              props.ingredients.find(
                (ingredient) => ingredient._id === "60666c42cc7b410027a1a9bc"
              ).image
            }
          />
        </li>
        <li className={styles.burgerConstructor__item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail={
              props.ingredients.find(
                (ingredient) => ingredient._id === "60666c42cc7b410027a1a9bb"
              ).image
            }
          />
        </li>
        <li className={styles.burgerConstructor__item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail={
              props.ingredients.find(
                (ingredient) => ingredient._id === "60666c42cc7b410027a1a9bb"
              ).image
            }
          />
        </li>
        <li className={styles.burgerConstructor__item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Мини-салат Экзо-Плантаго"
            price={4400}
            thumbnail={
              props.ingredients.find(
                (ingredient) => ingredient._id === "60666c42cc7b410027a1a9be"
              ).image
            }
          />
        </li>
      </ul>
      <div className="pr-5">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={
            props.ingredients.find(
              (ingredient) => ingredient._id === "60666c42cc7b410027a1a9b1"
            ).image
          }
        />
      </div>
      <div className={`${styles.burgerConstructor__buttonContainer} mt-6 pr-4`}>
        <div className={`${styles.burgerConstructor__totalPrice} mr-10`}>
          <p className="text text_type_digits-medium mr-2">7628</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient).isRequired
}


export default BurgerConstructor;
