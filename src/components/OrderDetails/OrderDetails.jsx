import styles from "./OrderDetails.module.scss";
import doneImage from "../../images/done.jpg";

const OrderDetails = () => {
  return (
    <div className={`${styles.container} mt-30 mb-30`}>
      <p className="text text_type_digits-large mb-8">314159</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={doneImage} alt="Галочка." className="mt-15 mb-15" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
