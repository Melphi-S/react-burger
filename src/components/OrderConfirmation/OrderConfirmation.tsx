import styles from "./OrderConfirmation.module.scss";
import doneImage from "../../images/done.jpg";
import Loader from "../Loader/Loader";
import { useSelector } from "../../types/store";
import { FC } from "react";

type TOrderConfirmationProps = {
  number: number | null;
};

const OrderConfirmation: FC<TOrderConfirmationProps> = ({ number }) => {
  const { postOrderRequest, postOrderFailed } = useSelector(
    (state) => state.order
  );

  return (
    <div className={`${styles.container} mt-30 mb-30`}>
      {!!postOrderRequest && <Loader text="Оформляем заказ" />}
      {!!postOrderFailed && (
        <>
          <p className="text text_type_main-default">Что-то пошло не так...</p>
          <p className="text text_type_main-default mt-8">
            Попробуйте оформить заказ повторно или свяжитесь с нами по телефону
          </p>
          <p className="text text_type_main-large mt-8">322-22-32-22</p>
        </>
      )}
      {!postOrderRequest && !postOrderFailed ? (
        <>
          <p className="text text_type_digits-large mb-8">{number}</p>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <img src={doneImage} alt="Галочка." className="mt-15 mb-15" />
          <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : null}
    </div>
  );
};

export default OrderConfirmation;
