import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startUserWsConnection,
  closeUserWsConnection,
} from "../../services/actions/wsOrders";
import OrderBriefList from "../OrderBriefList/OrderBriefList";
import Loader from "../Loader/Loader";
import styles from "./ProfileOrders.module.scss";

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { orders, isTrusted, connectionError } = useSelector(
    (state) => state.wsOrders
  );

  useEffect(() => {
    userInfo && dispatch(startUserWsConnection());

    return () => dispatch(closeUserWsConnection());
  }, [userInfo, dispatch]);

  const render = () => {
    if (userInfo) {
      if (orders) {
        return orders.orders?.length ? (
          <OrderBriefList />
        ) : (
          <p className={`${styles.noOrders} text text_type_main-large`}>
            К сожалению, мы не смогли найти ваши заказы
          </p>
        );
      } else if (isTrusted) {
        return (
          <div className={styles.loader}>
            <Loader text="Обновите страницу" />
          </div>
        );
      } else if (connectionError) {
        return (
          <div className={styles.loader}>
            <Loader text="Ошибка" />
          </div>
        );
      } else {
        return (
          <div className={styles.loader}>
            <Loader />
          </div>
        );
      }
    } else {
      return (
        <div className={styles.loader}>
          <Loader />
        </div>
      );
    }
  };

  return <>{render()}</>;
};

export default ProfileOrders;
