import OrderBrief from "../OrderBrief/OrderBrief";
import { useRouteMatch } from "react-router-dom";
import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./OrdersBriefList.module.scss";

const OrdersBriefList = ({ orders }) => {
  const { path } = useRouteMatch();
  const forUser = useMemo(() => path.startsWith("/profile"), [path]);

  return (
    <ul className={styles.orderList}>
      {orders.map((order, index) => (
        <OrderBrief order={order} key={index} forUser={forUser} />
      ))}
    </ul>
  );
};

OrdersBriefList.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default OrdersBriefList;
