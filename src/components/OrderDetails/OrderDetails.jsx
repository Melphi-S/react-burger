import styles from "./OrderDetails.module.scss";
import doneImage from "../../images/done.jpg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const OrderDetails = ({ number }) => {
  const { orderRequest, orderFailed } = useSelector((state) => state.order);

  return orderRequest ? (
    <div className={styles.spinner}></div>
  ) : orderFailed ? (
    <div className={`${styles.container} mt-30 mb-30`}>
      <h1 className="text text_type_main-default">Что-то пошло не так...</h1>
      <h1 className="text text_type_main-default mt-8">
        Попробуйте оформить заказ повторно или свяжитесь с нами по телефону
      </h1>
      <h1 className="text text_type_main-large mt-8">322-22-32-22</h1>
    </div>
  ) : (
    <div className={`${styles.container} mt-30 mb-30`}>
      <p className="text text_type_digits-large mb-8">{number}</p>
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

OrderDetails.propTypes = {
  number: PropTypes.number.isRequired,
};

export default OrderDetails;
