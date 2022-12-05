import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import OrdersBriefList from "../../components/OrdersBriefList/OrdersBriefList";
import OrdersSummary from "../../components/OrdersSummary/OrdersSummary";
import Loader from "../../components/Loader/Loader";
import {
  startPublicWsConnection,
  closePublicWsConnection,
} from "../../services/actions/wsOrders";
import styles from "./Feed.module.scss";

const Feed = () => {
  const dispatch = useDispatch();
  const { publicOrders, publicConnectionError } = useSelector(
    (state) => state.wsOrders
  );

  const ordersList = useMemo(() => publicOrders?.orders, [publicOrders]);

  useEffect(() => {
    dispatch(startPublicWsConnection());

    return () => dispatch(closePublicWsConnection());
  }, [dispatch]);

  const render = () => {
    if (publicOrders) {
      return (
        <main className={styles.feed}>
          <section>
            <h1 className="text text_type_main-large mt-10 mb-5">
              Лента заказов
            </h1>
            <OrdersBriefList orders={ordersList} />
          </section>
          <OrdersSummary orders={publicOrders} />
        </main>
      );
    } else if (publicConnectionError) {
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

export default Feed;
