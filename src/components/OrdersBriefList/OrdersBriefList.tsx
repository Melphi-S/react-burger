import OrderBrief from "../OrderBrief/OrderBrief";
import { useRouteMatch } from "react-router-dom";
import { useMemo, FC } from "react";
import styles from "./OrdersBriefList.module.scss";
import { TOrderInfo } from "../../types/order";

type TOrderBriefListProps = {
  orders: Array<TOrderInfo>;
};

const OrdersBriefList: FC<TOrderBriefListProps> = ({ orders }) => {
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

export default OrdersBriefList;
