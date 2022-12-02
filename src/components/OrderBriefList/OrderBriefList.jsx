import { useMemo } from "react";
import { useSelector } from "react-redux";
import OrderBrief from "../OrderBrief/OrderBrief";
import styles from "./OrderBriefList.module.scss";

const OrderBriefList = () => {
  const orderList = useSelector((state) => state.wsOrders.orders);

  const list = useMemo(
    () =>
      orderList?.orders
        .reverse()
        .map((order, index) => <OrderBrief order={order} key={index} />),
    [orderList]
  );

  return <>{list && <ul className={styles.orderList}>{list}</ul>}</>;
};

export default OrderBriefList;
