import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startUserWsConnection,
  closeUserWsConnection,
} from "../../services/actions/wsOrders";
import OrdersBriefList from "../OrdersBriefList/OrdersBriefList";
import Loader from "../Loader/Loader";
import { getCookie } from "../../utils/cookie";
import { refreshToken } from "../../services/actions/user";
import styles from "./ProfileOrders.module.scss";

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { userOrders, userConnectionError } = useSelector((state) => state.wsOrders);

  const token = getCookie("accessToken")?.replace("Bearer ", "");

  useEffect(() => {
    userInfo && dispatch(startUserWsConnection(token));

    return () => dispatch(closeUserWsConnection());
  }, [userInfo, token, dispatch]);

  const orders = useMemo(() => userOrders?.orders?.reverse(), [userOrders])

  const render = () => {
    if (userInfo && userOrders) {
      if (userOrders.orders) {
        return userOrders.orders.length ? (
          <OrdersBriefList orders={orders}/>
        ) : (
          <p className={`${styles.noOrders} text text_type_main-large`}>
            К сожалению, мы не смогли найти ваши заказы
          </p>
        );
      }
      if (userOrders.message && userOrders.message === "Invalid or missing token") {
        dispatch(refreshToken());
      }
    } else if (userConnectionError) {
      return (
        <div className={styles.loader}>
          <Loader text="Обновите страницу" />
        </div>
      );
    } else {
      return (
        <div className={styles.loader}>
          <Loader text="Ведём учёт"/>
        </div>
      );
    }
  };

  return <>{render()}</>;
};

export default ProfileOrders;
